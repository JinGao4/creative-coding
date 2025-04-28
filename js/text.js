class Text {
    constructor(game, text, x, y, align, color, size) {
        this.game = game;
        this.text = text;
        this.x = x;
        this.y = y;
        this.align = align;
        this.color = color;
        this.size = size;
    }
    
    draw() {
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.font = this.size + "px sans-serif";
        this.game.ctx.textAlign = this.align;
        this.game.ctx.fillText(this.text, this.x, this.y);
        this.game.ctx.closePath();
    }
}