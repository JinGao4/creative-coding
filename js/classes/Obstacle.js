class Obstacle {
    constructor(game, x, y, w, h, c) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        
        this.dx = -this.game.gameSpeed;
    }
    
    update() {
        this.x += this.dx;
        this.draw();
        this.dx = -this.game.gameSpeed;
    }
    
    draw() {
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = this.c;
        this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.game.ctx.closePath();
    }
}