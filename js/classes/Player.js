class Player {
    constructor(game, x, y, w, h, c) {
        // Reference to the Game instance
        this.game = game;

        // Position and size of the player
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        // Color used to draw the player
        this.c = c;

        // Vertical velocity
        this.dy = 0;

        // Jump strength
        this.jumpForce = 15;

        // Store original height for ducking logic
        this.originalHeight = h;

        // Indicates whether the player is on the ground
        this.grounded = true;

        // Timer to control jump duration and power
        this.jumpTimer = 0;
    }

    jump() {
        // Initiate a jump only if player is grounded and hasn't started jumping yet
        if (this.grounded && this.jumpTimer == 0) {
            this.jumpTimer = 1;
            this.dy = -this.jumpForce; // Launch upward
        } 
        // If the jump button is held, allow "variable jump height"
        else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++; // Extend jump duration
            this.dy = -this.jumpForce - (this.jumpTimer / 50); // Slightly stronger jump with time
        }
    }

    animate() {
        // === Input handling ===

        // If jump key is pressed, perform jump logic
        if (this.game.keys['Space'] || this.game.keys['KeyW'] || this.game.keys['ArrowUp']) {
            this.jump();
        } else {
            this.jumpTimer = 0; // Reset jump timer when jump key is released
        }

        // Ducking logic: reduce height while holding down key
        if (this.game.keys['ShiftLeft'] || this.game.keys['KeyS'] || this.game.keys['ArrowDown']) {
            this.h = this.originalHeight / 2; // Duck (crouch)
        } else {
            this.h = this.originalHeight; // Return to normal height
        }

        // === Physics ===

        // Apply vertical velocity
        this.y += this.dy;

        // Simulate gravity
        if (this.y + this.h < this.game.canvas.height) {
            this.dy += this.game.gravity; // Falling
            this.grounded = false;
        } else {
            // Stop falling when on the ground
            this.dy = 0;
            this.grounded = true;
            this.y = this.game.canvas.height - this.h; // Align with bottom of canvas
        }

        // Draw the player after movement and state changes
        this.draw();
    }

    draw() {
        // Begin new drawing path
        this.game.ctx.beginPath();

        // Set fill color and draw player rectangle
        this.game.ctx.fillStyle = this.c;
        this.game.ctx.fillRect(this.x, this.y, this.w, this.h);

        // Close the path
        this.game.ctx.closePath();
    }
}
