import AVFoundation
import Foundation
import ImageIO
import UniformTypeIdentifiers

guard CommandLine.arguments.count == 4 else {
  fputs("usage: extract-video-frame INPUT SECONDS OUTPUT\n", stderr)
  exit(2)
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
guard let seconds = Double(CommandLine.arguments[2]) else {
  fputs("seconds must be a number\n", stderr)
  exit(2)
}
let outputURL = URL(fileURLWithPath: CommandLine.arguments[3])
let asset = AVURLAsset(url: inputURL)
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.requestedTimeToleranceBefore = CMTime(seconds: 0.08, preferredTimescale: 600)
generator.requestedTimeToleranceAfter = CMTime(seconds: 0.08, preferredTimescale: 600)

do {
  let image = try generator.copyCGImage(at: CMTime(seconds: seconds, preferredTimescale: 600), actualTime: nil)
  guard let destination = CGImageDestinationCreateWithURL(outputURL as CFURL, UTType.jpeg.identifier as CFString, 1, nil) else {
    throw NSError(domain: "IronCompassFrame", code: 1)
  }
  CGImageDestinationAddImage(destination, image, [kCGImageDestinationLossyCompressionQuality: 0.94] as CFDictionary)
  guard CGImageDestinationFinalize(destination) else {
    throw NSError(domain: "IronCompassFrame", code: 2)
  }
} catch {
  fputs("\(error)\n", stderr)
  exit(1)
}
