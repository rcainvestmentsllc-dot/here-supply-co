import AVFoundation
import Foundation

@main
struct VideoEditor {
    struct Segment {
        let start: Double
        let end: Double

        var range: CMTimeRange {
            CMTimeRange(
                start: CMTime(seconds: start, preferredTimescale: 600),
                duration: CMTime(seconds: end - start, preferredTimescale: 600)
            )
        }
    }

    static func parseSegments(_ value: String) throws -> [Segment] {
        try value.split(separator: ",").map { raw in
            let bounds = raw.split(separator: "-")
            guard bounds.count == 2,
                  let start = Double(bounds[0]),
                  let end = Double(bounds[1]),
                  start >= 0,
                  end > start else {
                throw NSError(
                    domain: "VideoEditor",
                    code: 2,
                    userInfo: [NSLocalizedDescriptionKey: "Invalid segment: \(raw). Use start-end,start-end in seconds."]
                )
            }
            return Segment(start: start, end: end)
        }
    }

    static func main() async throws {
        guard CommandLine.arguments.count == 4 else {
            FileHandle.standardError.write(Data("usage: edit-video <input.mp4> <output.mp4> <start-end,start-end>\n".utf8))
            Foundation.exit(2)
        }

        let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
        let outputURL = URL(fileURLWithPath: CommandLine.arguments[2])
        let segments = try parseSegments(CommandLine.arguments[3])
        let source = AVURLAsset(url: inputURL)
        let sourceVideo = try await source.loadTracks(withMediaType: .video).first
        let sourceAudio = try await source.loadTracks(withMediaType: .audio).first

        guard let sourceVideo else {
            throw NSError(domain: "VideoEditor", code: 3, userInfo: [NSLocalizedDescriptionKey: "No video track found."])
        }

        let composition = AVMutableComposition()
        guard let outputVideo = composition.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid) else {
            throw NSError(domain: "VideoEditor", code: 4, userInfo: [NSLocalizedDescriptionKey: "Could not create video track."])
        }
        let outputAudio = sourceAudio.flatMap { _ in
            composition.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid)
        }
        let videoTrackRange = try await sourceVideo.load(.timeRange)
        let audioTrackRange = try await sourceAudio?.load(.timeRange)

        var cursor = CMTime.zero
        for segment in segments {
            let videoRange = CMTimeRangeGetIntersection(segment.range, otherRange: videoTrackRange)
            guard videoRange.duration > .zero else { continue }
            try outputVideo.insertTimeRange(videoRange, of: sourceVideo, at: cursor)
            if let sourceAudio, let outputAudio, let audioTrackRange {
                let audioRange = CMTimeRangeGetIntersection(videoRange, otherRange: audioTrackRange)
                if audioRange.duration > .zero {
                    try outputAudio.insertTimeRange(audioRange, of: sourceAudio, at: cursor)
                }
            }
            cursor = CMTimeAdd(cursor, videoRange.duration)
        }
        outputVideo.preferredTransform = try await sourceVideo.load(.preferredTransform)

        guard let exporter = AVAssetExportSession(asset: composition, presetName: AVAssetExportPresetHighestQuality) else {
            throw NSError(domain: "VideoEditor", code: 5, userInfo: [NSLocalizedDescriptionKey: "Could not create exporter."])
        }
        exporter.shouldOptimizeForNetworkUse = true
        try await exporter.export(to: outputURL, as: .mp4)
        print("wrote \(String(format: "%.2f", CMTimeGetSeconds(cursor))) seconds to \(outputURL.path)")
    }
}
