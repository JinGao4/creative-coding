class Player {
    constructor(game, x, y, w, h, c) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        
        this.dy = 0;
        this.jumpForce = 15;
        this.originalHeight = h;
        this.grounded = true; // Start on ground
        this.jumpTimer = 0;
    }
    
    jump() {
        if (this.grounded && this.jumpTimer == 0) {
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;
        } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++;
            this.dy = -this.jumpForce - (this.jumpTimer / 50);
        }
    }
    
    animate() {
        // Jump
        if (this.game.keys['Space'] || this.game.keys['KeyW'] || this.game.keys['ArrowUp']) {
            this.jump();
        } else {
            this.jumpTimer = 0;
        }
        
        // Duck
        if (this.game.keys['ShiftLeft'] || this.game.keys['KeyS'] || this.game.keys['ArrowDown']) {
            this.h = this.originalHeight / 2;
        } else {
            this.h = this.originalHeight;
        }
        
        this.y += this.dy;
        
        // Gravity with fixed canvas
        if (this.y + this.h < this.game.canvas.height) {
            this.dy += this.game.gravity;
            this.grounded = false;
        } else {
            this.dy = 0;
            this.grounded = true;
            this.y = this.game.canvas.height - this.h;
        }
        
        this.draw();
    }
    
    draw() {
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = this.c;
        this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.game.ctx.closePath();
    }
}