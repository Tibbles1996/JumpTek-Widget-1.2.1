let camera;
let currentFacingMode = "user";
let stream;

export function setupCamera(videoElement, onFrameCallback) {
  camera = new CameraUtils.Camera(videoElement, {
    onFrame: onFrameCallback,
    facingMode: currentFacingMode
  });
  camera.start();
}

export async function switchCamera(videoElement, onFrameCallback) {
  currentFacingMode = currentFacingMode === "user" ? "environment" : "user";
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
  setupCamera(videoElement, onFrameCallback);
}
