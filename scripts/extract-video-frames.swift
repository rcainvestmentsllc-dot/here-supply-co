import AVFoundation
import AppKit
import Foundation

@main
struct VideoFrameExtractor {
    static func main() async throws {
        guard CommandLine.arguments.count >= 4 else {
            FileHandle.standardError.write(Data("usage: extract-video-frames <input.mp4> <output-directory> <seconds>...\n".utf8))
            Foundation.exit(2)
        }

        let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
        let outputDirectory = URL(fileURLWithPath: CommandLine.arguments[2], isDirectory: true)
        try FileManager.default.createDirectory(at: outputDirectory, withIntermediateDirectories: true)

        let asset = AVURLAsset(url: inputURL)
        let generator = AVAssetImageGenerator(asset: asset)
        generator.appliesPreferredTrackTransform = true
        generator.requestedTimeToleranceBefore = CMTime(seconds: 0.06, preferredTimescale: 600)
        generator.requestedTimeToleranceAfter = CMTime(seconds: 0.06, preferredTimescale: 600)

        for raw in CommandLine.arguments.dropFirst(3) {
            guard let seconds = Double(raw) else { continue }
            let time = CMTime(seconds: seconds, preferredTimescale: 600)
            let (image, actualTime) = try await generator.image(at: time)
            let bitmap = NSBitmapImageRep(cgImage: image)
            guard let jpeg = bitmap.representation(using: .jpeg, properties: [.compressionFactor: 0.9]) else { continue }
            let filename = String(format: "frame-%05.2f.jpg", CMTimeGetSeconds(actualTime))
            try jpeg.write(to: outputDirectory.appendingPathComponent(filename))
            print(filename)
        }
    }
}
