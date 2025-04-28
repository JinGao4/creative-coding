class Game {
    constructor() {
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        this.keys = {};
        this.gameSpeed = 3;
        this.gravity = 1;
        this.score = 0;
        this.highscore = localStorage.getItem('highscore') || 0;
        this.obstacles = [];
        this.spawnTimer = 200;
        this.initialSpawnTimer = 200;
        
        this.setupEventListeners();
        this.init();
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (evt) => {
            this.keys[evt.code] = true;
        });
        
        document.addEventListener('keyup', (evt) => {
            this.keys[evt.code] = false;
        });
    }
    
    init() {
        this.player = new Player(this, 25, this.canvas.height - 50, 50, 50, '#FF5858');
        this.scoreText = new Text(this, "Score: " + this.score, 25, 25, "left", "#212121", "20");
        this.highscoreText = new Text(this, "Highscore: " + this.highscore, this.canvas.width - 25, 25, "right", "#212121", "20");
        
        // Start the game loop
        this.gameLoop();
    }
    
    gameLoop() {
        this.update();
        requestAnimationFrame(() => this.gameLoop());
    }
    
    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Obstacle spawning logic
        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
            this.spawnObstacle();
            this.spawnTimer = this.initialSpawnTimer - this.gameSpeed * 8;
            
            if (this.spawnTimer < 60) {
                this.spawnTimer = 60;
            }
        }
        
        // Obstacle collision and update
        for (let i = 0; i < this.obstacles.length; i++) {
            let o = this.obstacles[i];
            
            if (o.x + o.w < 0) {
                this.obstacles.splice(i, 1);
            }
            
            if (this.checkCollision(this.player, o)) {
                this.obstacles = [];
                this.score = 0;
                this.spawnTimer = this.initialSpawnTimer;
                this.gameSpeed = 3;
                localStorage.setItem('highscore', this.highscore);
            }
            
            o.update();
        }
        
        this.player.animate();
        
        // Score handling
        this.score++;
        this.scoreText.text = "Score: " + this.score;
        this.scoreText.draw();
        
        if (this.score > this.highscore) {
            this.highscore = this.score;
            this.highscoreText.text = "Highscore: " + this.highscore;
        }
        
        this.highscoreText.draw();
        this.gameSpeed += 0.003;
    }
    
    spawnObstacle() {
        let size = this.randomIntInRange(20, 70);
        let type = this.randomIntInRange(0, 1);
        let obstacle = new Obstacle(this, this.canvas.width + size, this.canvas.height - size, size, size, '#2484E4');
        
        if (type == 1) {
            obstacle.y -= this.player.originalHeight - 10;
        }
        this.obstacles.push(obstacle);
    }
    
    randomIntInRange(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    
    checkCollision(player, obstacle) {
        return (
            player.x < obstacle.x + obstacle.w &&
            player.x + player.w > obstacle.x &&
            player.y < obstacle.y + obstacle.h &&
            player.y + player.h > obstacle.y
        );
    }
}