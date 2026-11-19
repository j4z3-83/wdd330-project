const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 300;

// 1. Sprite Sheet Setup (Replace with your own sprite sheet)
const sprite = new Image();
sprite.src = "/images/villager-walking-sprite-sheet.png"; // Example: 4 frames arranged horizontally
let spriteLoaded = false;
sprite.onload = () => { spriteLoaded = true; };

// 2. Character Configuration
const character = {
    x: -64,                // Start just off the left edge
    y: 70,                // Ground height
    width: 256,             // Width of a single frame on screen
    height: 256,            // Height of a single frame on screen
    speed: 3,              // Pixels moved per frame
    frameX: 0,             // Current animation frame (0 to totalFrames - 1)
    totalFrames: 7,        // Total columns in your sprite sheet
    frameTimer: 0,
    frameInterval: 6       // Lower = faster leg movement
};

// 3. Main Animation Loop
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
            character.frameX * spriteWidth, 0, spriteWidth, spriteHeight, // Source crop
            character.x, character.y, character.width, character.height     // Destination on canvas
        );
    } else {
        // Fallback placeholder (bobs up and down slightly to simulate walking)
        const bobOffset = (character.frameX % 2 === 0) ? 0 : -4;
        ctx.fillStyle = "#3182ce";
        ctx.fillRect(character.x, character.y + bobOffset, character.width, character.height);
    }

    requestAnimationFrame(animate);
}

// Start the loop
animate();