import AVFoundation
import Foundation
import Speech

@available(macOS 26.0, *)
@main
struct VideoTranscriber {
    struct Cue {
        let start: Double
        let end: Double
        let text: String
    }

    static func timestamp(_ seconds: Double) -> String {
        let safe = max(0, seconds)
        let hours = Int(safe / 3600)
        let minutes = Int(safe.truncatingRemainder(dividingBy: 3600) / 60)
        let wholeSeconds = Int(safe.truncatingRemainder(dividingBy: 60))
        let milliseconds = Int((safe - floor(safe)) * 1000)
        return String(format: "%02d:%02d:%02d.%03d", hours, minutes, wholeSeconds, milliseconds)
    }

    static func mergeForCaptions(_ raw: [Cue]) -> [Cue] {
        var merged: [Cue] = []
        var currentText = ""
        var currentStart = 0.0
        var currentEnd = 0.0

        func flush() {
            guard !currentText.isEmpty else { return }
            merged.append(Cue(start: currentStart, end: max(currentEnd, currentStart + 1.2), text: currentText))
            currentText = ""
        }

        for cue in raw {
            let gap = currentText.isEmpty ? 0 : cue.start - currentEnd
            let proposed = currentText.isEmpty ? cue.text : currentText + " " + cue.text
            let tooLong = proposed.count > 92 || (!currentText.isEmpty && cue.end - currentStart > 6.4)
            if !currentText.isEmpty && (gap > 1.15 || tooLong) {
                flush()
            }
            if currentText.isEmpty {
                currentStart = cue.start
                currentEnd = cue.end
                currentText = cue.text
            } else {
                currentEnd = max(currentEnd, cue.end)
                currentText += " " + cue.text
            }
            if currentText.last.map({ ".!?".contains($0) }) == true && currentEnd - currentStart >= 1.4 {
                flush()
            }
        }
        flush()

        return merged.enumerated().map { index, cue in
            guard index + 1 < merged.count else { return cue }
            let safeEnd = min(cue.end, merged[index + 1].start - 0.06)
            return Cue(start: cue.start, end: max(safeEnd, cue.start + 0.8), text: cue.text)
        }
    }

    static func main() async throws {
        guard CommandLine.arguments.count == 3 || CommandLine.arguments.count == 4 else {
            FileHandle.standardError.write(Data("usage: transcribe-video <audio-file> <captions.vtt> [public-max-seconds]\n".utf8))
            Foundation.exit(2)
        }

        let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
        let outputURL = URL(fileURLWithPath: CommandLine.arguments[2])
        let publicMaxSeconds = CommandLine.arguments.count == 4 ? Double(CommandLine.arguments[3]) : nil
        let requestedLocale = Locale(identifier: "en-US")
        guard let locale = await SpeechTranscriber.supportedLocale(equivalentTo: requestedLocale) else {
            throw NSError(domain: "VideoTranscriber", code: 1, userInfo: [NSLocalizedDescriptionKey: "English transcription is not supported on this Mac."])
        }

        let transcriber = SpeechTranscriber(locale: locale, preset: .timeIndexedTranscriptionWithAlternatives)
        let modules: [any SpeechModule] = [transcriber]
        let status = await AssetInventory.status(forModules: modules)
        if status != .installed {
            if let request = try await AssetInventory.assetInstallationRequest(supporting: modules) {
                try await request.downloadAndInstall()
            }
        }

        let audioFile = try AVAudioFile(forReading: inputURL)
        let analyzer = SpeechAnalyzer(modules: modules)
        var cues: [Cue] = []

        let resultsTask = Task {
            for try await result in transcriber.results {
                guard result.isFinal else { continue }
                let text = String(result.text.characters)
                    .replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression)
                    .trimmingCharacters(in: .whitespacesAndNewlines)
                guard !text.isEmpty else { continue }
                let start = CMTimeGetSeconds(result.range.start)
                let duration = CMTimeGetSeconds(result.range.duration)
                cues.append(Cue(start: start, end: start + max(duration, 0.25), text: text))
            }
        }

        try await analyzer.start(inputAudioFile: audioFile, finishAfterFile: true)
        try await resultsTask.value

        let captionCues = mergeForCaptions(cues).compactMap { cue -> Cue? in
            guard let publicMaxSeconds else { return cue }
            guard cue.start < publicMaxSeconds else { return nil }
            return Cue(start: cue.start, end: min(cue.end, publicMaxSeconds), text: cue.text)
        }
        var vtt = "WEBVTT\n\n"
        for (index, cue) in captionCues.enumerated() {
            vtt += "\(index + 1)\n"
            vtt += "\(timestamp(cue.start)) --> \(timestamp(cue.end))\n"
            vtt += "\(cue.text)\n\n"
        }
        try vtt.write(to: outputURL, atomically: true, encoding: .utf8)
        print("wrote \(captionCues.count) caption cues from \(cues.count) transcript fragments to \(outputURL.path)")
    }
}
