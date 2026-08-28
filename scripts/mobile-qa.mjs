import fs from "node:fs";

const targetUrl = process.argv[2] || "http://localhost:3000/";
const outputPath = process.argv[3] || "/private/tmp/iron-compass-mobile-cdp.png";
const debugPort = process.argv[4] || "9223";

const page = await (
  await fetch(`http://127.0.0.1:${debugPort}/json/new?${encodeURIComponent(targetUrl)}`, {
    method: "PUT",
  })
).json();

const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.onopen = resolve;
  socket.onerror = reject;
});

let sequence = 0;
function call(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const handleMessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id !== id) return;
      socket.removeEventListener("message", handleMessage);
      if (message.error) reject(message.error);
      else resolve(message.result);
    };
    socket.addEventListener("message", handleMessage);
    socket.send(JSON.stringify({ id, method, params }));
  });
}

await call("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: 390,
  screenHeight: 844,
});
await call("Page.enable");
await call("Page.navigate", { url: targetUrl });
await new Promise((resolve) => setTimeout(resolve, 1200));

const metrics = await call("Runtime.evaluate", {
  expression:
    "JSON.stringify({innerWidth,clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.getBoundingClientRect().width,dpr:devicePixelRatio})",
  returnByValue: true,
});
console.log(metrics.result.value);

const screenshot = await call("Page.captureScreenshot", {
  format: "png",
  fromSurface: true,
  captureBeyondViewport: false,
});
fs.writeFileSync(outputPath, Buffer.from(screenshot.data, "base64"));
socket.close();
