const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const siteLinks = document.getElementById("siteLinks");

canvas.width = window.innerWidth;
canvas.height = 300;

// 1. Audio Setup (Add your .ogg file paths here)
const oggFiles = [
    "villager-idle1.ogg",
    "villager-idle2.ogg",
    "villager-idle3.ogg"
];

function playRandomOgg() {
    const randomIndex = Math.floor(Math.random() * oggFiles.length);
    const audio = new Audio(oggFiles[randomIndex]);
    audio.play().catch(error => {
        console.warn("Audio playback failed (likely blocked by browser):", error);
    });
}

// 2. Sprite Sheet Setup (Replace with your own sprite sheet)
const sprite = new Image();
sprite.src = "villager-walking-sprite-sheet.gif"; // Example: 7 frames arranged horizontally
let spriteLoaded = false;

sprite.onload = () => {
    spriteLoaded = true;
};

// 3. Character Configuration
const character = {
    x: -300, // Start just off the left edge
    y: 50, // Ground height
    width: 300, // Width of a single frame on screen
    height: 256, // Height of a single frame on screen
    speed: 4, // Pixels moved per frame
    frameX: 0, // Current animation frame (0 to totalFrames - 1)
    totalFrames: 7, // Total columns in your sprite sheet
    frameTimer: 0,
    frameInterval: 5 // Lower = faster leg movement
};

// 4. Main Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a simple ground line
    ctx.fillStyle = "#4a5568";
    ctx.fillRect(0, character.y + character.height, canvas.width, 4);

    // Move character across the screen
    character.x += character.speed;

    // Stop the animation loop once the character completely exits the right edge
    if (character.x > canvas.width) {
        return; // Exits the function without calling requestAnimationFrame
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
    character.x = -300; // Reset position if clicked again
    playRandomOgg();
    animate();
    siteLinks.classList.add('animate');
    startButton.remove();
});