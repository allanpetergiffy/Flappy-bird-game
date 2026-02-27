const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let birdX = 50, birdY = 200, velocity = 0;
const gravity = 0.5, jump = -8;
let pipes = [];
let score = 0;
let gameOver = false;

// Bird image
const birdImg = new Image();
birdImg.src = "https://i.ibb.co/4f1kYwY/flappy.png";

// Handle jump
document.addEventListener("keydown", () => {
  if (gameOver) {
    resetGame();
  } else {
    velocity = jump;
  }
});

// Pipe generator
function createPipe() {
  const gap = 120;
  const topHeight = Math.random() * (canvas.height - gap - 100) + 50;
  pipes.push({
    x: canvas.width,
    top: topHeight,
    bottom: topHeight + gap
  });
}

// Reset game
function resetGame() {
  birdY = 200;
  velocity = 0;
  pipes = [];
  score = 0;
  gameOver = false;
}

// Update game state
function update() {
  if (gameOver) return;

  velocity += gravity;
  birdY += velocity;

  // Add pipes
  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
    createPipe();
  }

  // Move pipes
  pipes.forEach(pipe => pipe.x -= 2);

  // Collision detection
  pipes.forEach(pipe => {
    if (
      birdX + 30 > pipe.x && birdX < pipe.x + 50 &&
      (birdY < pipe.top || birdY + 30 > pipe.bottom)
    ) {
      gameOver = true;
    }
    if (pipe.x + 50 === birdX) score++;
  });

  if (birdY > canvas.height || birdY < 0) gameOver = true;
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bird
  ctx.drawImage(birdImg, birdX, birdY, 30, 30);

  // Pipes
  ctx.fillStyle = "#228B22";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, 50, pipe
