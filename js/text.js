class Text {
    constructor(game, text, x, y, align, color, size) {
        // Reference to the Game instance (for canvas context)
        this.game = game;

        // The actual text content to display (e.g., "Score: 100")
        this.text = text;

        // Coordinates where the text will be drawn on the canvas
        this.x = x;
        this.y = y;

        // Text alignment: can be "left", "center", or "right"
        this.align = align;

        // Text color (any valid CSS color)
        this.color = color;

        // Font size in pixels
        this.size = size;
    }

    draw() {
        // Begin a new drawing path
        this.game.ctx.beginPath();

        // Set the text color
        this.game.ctx.fillStyle = this.color;

        // Set the font style and size
        this.game.ctx.font = this.size + "px sans-serif";

        // Set horizontal text alignment (e.g., left-aligned, centered, etc.)
        this.game.ctx.textAlign = this.align;

        // Render the text on the canvas at specified position
        this.game.ctx.fillText(this.text, this.x, this.y);

        // Close the drawing path
        this.game.ctx.closePath();
    }
}
