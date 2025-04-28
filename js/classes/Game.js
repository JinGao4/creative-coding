class Game {
    constructor() {
        // Get the canvas element and its 2D drawing context
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');

        // Object to store key press states (e.g., {"ArrowUp": true})
        this.keys = {};

        // Controls how fast the game runs (affects obstacle movement)
        this.gameSpeed = 3;

        // Gravity applied to the player (used in physics calculations)
        this.gravity = 1;

        // Current score in the game session
        this.score = 0;

        // Retrieve highscore from browser's local storage, or default to 0
        this.highscore = localStorage.getItem('highscore') || 0;

        // Array to keep track of all active obstacles
        this.obstacles = [];

        // Timer to control when a new obstacle spawns
        this.spawnTimer = 200;
        this.initialSpawnTimer = 200;

        // Set up keyboard event listeners for input control
        this.setupEventListeners();

        // Initialize the game (create player, text, start loop)
        this.init();
    }

    setupEventListeners() {
        // When a key is pressed, store it as "true"
        document.addEventListener('keydown', (evt) => {
            this.keys[evt.code] = true;
        });

        // When a key is released, mark it as "false"
        document.addEventListener('keyup', (evt) => {
            this.keys[evt.code] = false;
        });
    }

    init() {
        // Create the player object at the bottom-left of the canvas
        this.player = new Player(this, 25, this.canvas.height - 50, 50, 50, '#FF5858');

        // Create text objects for score and highscore displays
        this.scoreText = new Text(this, "Score: " + this.score, 25, 25, "left", "#212121", "20");
        this.highscoreText = new Text(this, "Highscore: " + this.highscore, this.canvas.width - 25, 25, "right", "#212121", "20");

        // Start the main game loop
        this.gameLoop();
    }

    gameLoop() {
        // Update game logic and visuals
        this.update();

        // Use requestAnimationFrame for smoother animation and efficient looping
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        // Clear the canvas for the next frame
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Handle obstacle spawning
        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
            this.spawnObstacle();

            // Reduce spawn interval as game progresses (increases difficulty)
            this.spawnTimer = this.initialSpawnTimer - this.gameSpeed * 8;

            // Cap minimum spawn interval to prevent too frequent spawning
            if (this.spawnTimer < 60) {
                this.spawnTimer = 60;
            }
        }

        // Loop through all obstacles for updates and collision detection
        for (let i = 0; i < this.obstacles.length; i++) {
            let o = this.obstacles[i];

            // Remove obstacles that have moved off screen
            if (o.x + o.w < 0) {
                this.obstacles.splice(i, 1);
            }

            // Check for collision between player and obstacle
            if (this.checkCollision(this.player, o)) {
                // On collision: reset game state
                this.obstacles = [];
                this.score = 0;
                this.spawnTimer = this.initialSpawnTimer;
                this.gameSpeed = 3;

                // Save current highscore to local storage
                localStorage.setItem('highscore', this.highscore);
            }

            // Update obstacle position (movement)
            o.update();
        }

        // Animate the player (update movement, jumping, etc.)
        this.player.animate();

        // Increment score each frame as time-based progress
        this.score++;

        // Update score text and redraw it
        this.scoreText.text = "Score: " + this.score;
        this.scoreText.draw();

        // If new score exceeds previous highscore, update it
        if (this.score > this.highscore) {
            this.highscore = this.score;
            this.highscoreText.text = "Highscore: " + this.highscore;
        }

        // Draw updated highscore text
        this.highscoreText.draw();

        // Gradually increase game speed over time to raise difficulty
        this.gameSpeed += 0.003;
    }

    spawnObstacle() {
        // Generate a random size for the obstacle
        let size = this.randomIntInRange(20, 70);

        // Randomly choose obstacle type (e.g., ground or elevated)
        let type = this.randomIntInRange(0, 1);

        // Create new obstacle off-screen to the right
        let obstacle = new Obstacle(this, this.canvas.width + size, this.canvas.height - size, size, size, '#2484E4');

        // Adjust obstacle height for elevated type
        if (type == 1) {
            obstacle.y -= this.player.originalHeight - 10;
        }

        // Add the obstacle to the active list
        this.obstacles.push(obstacle);
    }

    randomIntInRange(min, max) {
        // Returns a random integer between min and max (inclusive)
        return Math.round(Math.random() * (max - min) + min);
    }

    checkCollision(player, obstacle) {
        // Simple AABB (Axis-Aligned Bounding Box) collision detection
        return (
            player.x < obstacle.x + obstacle.w &&
            player.x + player.w > obstacle.x &&
            player.y < obstacle.y + obstacle.h &&
            player.y + player.h > obstacle.y
        );
    }
}
