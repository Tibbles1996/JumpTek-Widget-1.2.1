import { jumpCount, highestJump, lowestJump, totalJumpHeight } from './jumpLogic.js';

export function updateJumpStats(height, airtime) {
  document.getElementById("jumpHeight").textContent = height.toFixed(2);
  document.getElementById("airtime").textContent = airtime.toFixed(2);
  document.getElementById("highestJump").textContent = highestJump.toFixed(2);
  document.getElementById("lowestJump").textContent = lowestJump.toFixed(2);
  document.getElementById("averageJump").textContent = (totalJumpHeight / jumpCount).toFixed(2);
  document.getElementById("jumpCount").textContent = jumpCount;
}
