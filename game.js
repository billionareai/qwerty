const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let plane = { x: canvas.width / 2 - 20, y: canvas.height - 100, width: 40, height: 40 };
let bullets = [];
let obstacles = [];
let score = 0;

// Draw airplane
function drawPlane() {
    ctx.fillStyle = "blue";
    ctx.fillRect(plane.x, plane.y, plane.width, plane.height);
}

// Draw bullets
function drawBullets() {
    ctx.fillStyle = "red";
    bullets.forEach((bullet, index) => {
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
        bullet.y -= 5;
        if (bullet.y < 0) bullets.splice(index, 1);
    });
}

// Draw obstacles
function drawObstacles() {
    ctx.fillStyle = "black";
    obstacles.forEach((obstacle, index) => {
        ctx.fillRect(obstacle.x, obstacle.y, 40, 40);
        obstacle.y += 3;
        if (obstacle.y > canvas.height) obstacles.splice(index, 1);
    });
}

// Collision detection
function checkCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        obstacles.forEach((obstacle, obstacleIndex) => {
            if (
                bullet.x < obstacle.x + 40 &&
                bullet.x + 5 > obstacle.x &&
                bullet.y < obstacle.y + 40 &&
                bullet.y + 10 > obstacle.y
            ) {
                bullets.splice(bulletIndex, 1);
                obstacles.splice(obstacleIndex, 1);
                score++;
            }
        });
    });
}

// Update game objects
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlane();
    drawBullets();
    drawObstacles();
    checkCollisions();
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);

    requestAnimationFrame(updateGame);
}

// Spawn obstacles
setInterval(() => {
    let x = Math.random() * (canvas.width - 40);
    obstacles.push({ x: x, y: -40 });
}, 2000);

// Event listeners
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && plane.x > 0) plane.x -= 20;
    if (e.key === "ArrowRight" && plane.x < canvas.width - plane.width) plane.x += 20;
    if (e.key === " ") bullets.push({ x: plane.x + plane.width / 2 - 2.5, y: plane.y });
});

// Start the game
updateGame();
