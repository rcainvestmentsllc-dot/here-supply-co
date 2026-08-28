import AVFoundation
import Foundation

guard CommandLine.arguments.count >= 4 else {
  FileHandle.standardError.write(Data("Usage: swift compress-video.swift input.mp4 output.mp4 bitrate\n".utf8))
  exit(2)
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2])
guard let bitrate = Int(CommandLine.arguments[3]) else {
  FileHandle.standardError.write(Data("Bitrate must be an integer in bits per second.\n".utf8))
  exit(2)
}
let audioBitrate = CommandLine.arguments.count >= 5 ? (Int(CommandLine.arguments[4]) ?? 96_000) : 96_000

try? FileManager.default.removeItem(at: outputURL)

let asset = AVURLAsset(url: inputURL)
guard let videoTrack = asset.tracks(withMediaType: .video).first else {
  FileHandle.standardError.write(Data("No video track found.\n".utf8))
  exit(1)
}

do {
  let reader = try AVAssetReader(asset: asset)
  let writer = try AVAssetWriter(outputURL: outputURL, fileType: .mp4)
  writer.shouldOptimizeForNetworkUse = true

  let videoOutput = AVAssetReaderTrackOutput(
    track: videoTrack,
    outputSettings: [
      kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange
    ]
  )
  videoOutput.alwaysCopiesSampleData = false
  guard reader.canAdd(videoOutput) else { throw NSError(domain: "IronCompassVideo", code: 10) }
  reader.add(videoOutput)

  let size = videoTrack.naturalSize
  let videoInput = AVAssetWriterInput(
    mediaType: .video,
    outputSettings: [
      AVVideoCodecKey: AVVideoCodecType.h264,
      AVVideoWidthKey: abs(size.width),
      AVVideoHeightKey: abs(size.height),
      AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: bitrate,
        AVVideoMaxKeyFrameIntervalKey: 60,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel
      ]
    ]
  )
  videoInput.transform = videoTrack.preferredTransform
  videoInput.expectsMediaDataInRealTime = false
  guard writer.canAdd(videoInput) else { throw NSError(domain: "IronCompassVideo", code: 11) }
  writer.add(videoInput)

  var audioOutput: AVAssetReaderTrackOutput?
  var audioInput: AVAssetWriterInput?
  if let audioTrack = asset.tracks(withMediaType: .audio).first {
    let output = AVAssetReaderTrackOutput(
      track: audioTrack,
      outputSettings: [AVFormatIDKey: kAudioFormatLinearPCM]
    )
    if reader.canAdd(output) {
      reader.add(output)
      audioOutput = output
    }

    let input = AVAssetWriterInput(
      mediaType: .audio,
      outputSettings: [
        AVFormatIDKey: kAudioFormatMPEG4AAC,
        AVNumberOfChannelsKey: 2,
        AVSampleRateKey: 44_100,
        AVEncoderBitRateKey: audioBitrate
      ]
    )
    input.expectsMediaDataInRealTime = false
    if writer.canAdd(input) {
      writer.add(input)
      audioInput = input
    }
  }

  guard writer.startWriting() else { throw writer.error ?? NSError(domain: "IronCompassVideo", code: 12) }
  guard reader.startReading() else { throw reader.error ?? NSError(domain: "IronCompassVideo", code: 13) }
  writer.startSession(atSourceTime: .zero)

  let group = DispatchGroup()
  let videoQueue = DispatchQueue(label: "iron-compass.video")
  group.enter()
  videoInput.requestMediaDataWhenReady(on: videoQueue) {
    while videoInput.isReadyForMoreMediaData {
      if let sample = videoOutput.copyNextSampleBuffer() {
        if !videoInput.append(sample) {
          videoInput.markAsFinished()
          group.leave()
          return
        }
      } else {
        videoInput.markAsFinished()
        group.leave()
        return
      }
    }
  }

  if let audioOutput, let audioInput {
    let audioQueue = DispatchQueue(label: "iron-compass.audio")
    group.enter()
    audioInput.requestMediaDataWhenReady(on: audioQueue) {
      while audioInput.isReadyForMoreMediaData {
        if let sample = audioOutput.copyNextSampleBuffer() {
          if !audioInput.append(sample) {
            audioInput.markAsFinished()
            group.leave()
            return
          }
        } else {
          audioInput.markAsFinished()
          group.leave()
          return
        }
      }
    }
  }

  group.wait()
  let completion = DispatchSemaphore(value: 0)
  writer.finishWriting { completion.signal() }
  completion.wait()

  guard writer.status == .completed else {
    throw writer.error ?? reader.error ?? NSError(domain: "IronCompassVideo", code: 14)
  }
  print(outputURL.path)
} catch {
  FileHandle.standardError.write(Data("Compression failed: \(error)\n".utf8))
  exit(1)
}
