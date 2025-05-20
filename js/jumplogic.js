export let jumpCount = 0;
export let highestJump = 0;
export let lowestJump = Infinity;
export let totalJumpHeight = 0;

let inAir = false;
let jumpStartTime = 0;

export function processJump(landmarks) {
  const leftAnkle = landmarks[27];
  const rightAnkle = landmarks[28];
  if (!leftAnkle || !rightAnkle) return;

  const avgY = (leftAnkle.y + rightAnkle.y) / 2;
  const jumpHeight = Math.max(0, 1 - avgY); // Basic mock height

  if (jumpHeight > 0.1 && !inAir) {
    inAir = true;
    jumpStartTime = performance.now();
  } else if (jumpHeight < 0.1 && inAir) {
    inAir = false;
    const airtime = (performance.now() - jumpStartTime) / 1000;
    jumpCount++;
    totalJumpHeight += jumpHeight;
    highestJump = Math.max(highestJump, jumpHeight);
    lowestJump = Math.min(lowestJump, jumpHeight);
    return { jumpHeight, airtime };
  }

  return null;
}
