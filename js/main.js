import { setupPose, pose } from './pose.js'; 
import { setupCamera, switchCamera } from './camera.js';
import { processJump } from './jumpLogic.js';
import { updateJumpStats } from './ui.js';

const videoElement = document.createElement("video");
videoElement.style.display = "none";
document.body.appendChild(videoElement);

const canvasElement = document.querySelector(".output");
const canvasCtx = canvasElement.getContext("2d");
const landmarkCanvas = document.querySelector(".landmark");
const landmarkCtx = landmarkCanvas.getContext("2d");

function resizeCanvas() {
  canvasElement.width = landmarkCanvas.width = window.innerWidth;
  canvasElement.height = landmarkCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

setupPose(onPoseResults);
setupCamera(videoElement, () => pose.send({ image: videoElement }));

function onPoseResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.restore();

  landmarkCtx.clearRect(0, 0, landmarkCanvas.width, landmarkCanvas.height);

  if (results.poseLandmarks) {
    drawConnectors(landmarkCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: "#00FF00", lineWidth: 4 });
    drawLandmarks(landmarkCtx, results.poseLandmarks, { color: "#FF0000", lineWidth: 2 });

    const result = processJump(results.poseLandmarks);
    if (result) updateJumpStats(result.jumpHeight, result.airtime);
  }
}

document.getElementById("switch-camera-button").addEventListener("click", () => {
  switchCamera(videoElement, () => pose.send({ image: videoElement }));
});
