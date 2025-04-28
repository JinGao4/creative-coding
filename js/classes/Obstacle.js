class Obstacle {
    constructor(game, x, y, w, h, c) {
        // Reference to the Game instance to access shared state like context, speed, etc.
        this.game = game;

        // Position of the obstacle (top-left corner)
        this.x = x;
        this.y = y;

        // Width and height of the obstacle
        this.w = w;
        this.h = h;

        // Color used to draw the obstacle
        this.c = c;

        // Horizontal velocity: moves to the left based on current game speed
        this.dx = -this.game.gameSpeed;
    }

    update() {
        // Move the obstacle left across the screen
        this.x += this.dx;

        // Draw the obstacle in its new position
        this.draw();

        // Update speed in case gameSpeed has changed since last frame
        this.dx = -this.game.gameSpeed;
    }

    draw() {
        // Begin drawing a new shape
        this.game.ctx.beginPath();

        // Set the fill color for the obstacle
        this.game.ctx.fillStyle = this.c;

        // Draw a filled rectangle representing the obstacle
        this.game.ctx.fillRect(this.x, this.y, this.w, this.h);

        // Finish the drawing path
        this.game.ctx.closePath();
    }
}
