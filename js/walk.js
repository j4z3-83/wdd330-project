const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const siteLinks = document.getElementById("siteLinks");

canvas.width = window.innerWidth;
canvas.height = 300;

// 1. Audio Setup
const oggFiles = [
    "sounds/villager-idle1.ogg",
    "sounds/villager-idle2.ogg",
    "sounds/villager-idle3.ogg"
];

let isWalking = false;
let currentAudio = null;
let soundTimeout = null;

function playRandomOgg() {
    if (!isWalking) return;

    const randomIndex = Math.floor(Math.random() * oggFiles.length);
    currentAudio = new Audio(oggFiles[randomIndex]);

    currentAudio.addEventListener("ended", () => {
        if (isWalking) {
            soundTimeout = setTimeout(playRandomOgg, 2000);
        }
    });

    currentAudio.play().catch(error => {
        console.warn("Audio playback failed (likely blocked by browser):", error);
    });
}

// 2. Sprite Sheet Setup
const sprite = new Image();
sprite.src = "images/villager-walking-sprite-sheet.png";
let spriteLoaded = false;

sprite.onload = () => {
    spriteLoaded = true;
};

// 3. Character Configuration
const character = {
    x: -300,
    y: 50,
    width: 300,
    height: 256,
    speed: 4,
    frameX: 0,
    totalFrames: 7,
    frameTimer: 0,
    frameInterval: 5
};

// 4. Main Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#4a5568";
    ctx.fillRect(0, character.y + character.height, canvas.width, 4);

    // Move character across the screen
    character.x += character.speed;

    // Stop the animation loop once the character completely exits the right edge
    if (character.x > canvas.width) {
        isWalking = false;
        clearTimeout(soundTimeout);
        return;
    }

    // Advance the walk cycle frame
    character.frameTimer++;
    if (character.frameTimer >= character.frameInterval) {
        character.frameX = (character.frameX + 1) % character.totalFrames;
        character.frameTimer = 0;
    }

    // Draw the character
    if (spriteLoaded) {
        const spriteWidth = sprite.width / character.totalFrames;
        const spriteHeight = sprite.height;

        ctx.drawImage(
            sprite,
            character.frameX * spriteWidth,
            0,
            spriteWidth,
            spriteHeight,
            character.x,
            character.y,
            character.width,
            character.height
        );
    }

    requestAnimationFrame(animate);
}

// 5. Start Trigger
startButton.addEventListener("click", () => {
    character.x = -300;
    isWalking = true;

    soundTimeout = setTimeout(() => {
        playRandomOgg();
    }, 1000)

    animate();

    siteLinks.classList.add('animate');
    startButton.remove();
});