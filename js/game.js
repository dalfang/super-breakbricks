class Game {
    constructor(gameArea) {
        this.gameArea = gameArea;
        this.height = 2880
        this.width = 1614;
        this.score = 0;
        this.lives = 3;
        this.aliens = []; //array to hold alien objects.
        this.bullets = [];//array to hold bullet objects.
        this.player = new Player(
            this.gameArea,
            350,
            290); // player size x, y here
        this.player.setImage('../img/spider-man.png'); // i set the player image
        this.gameInterval = null;
        this.gameLoopFrequency = 1000 / 60;
        this.updateDisplay(); //the score and lives display
    }

    start() {
        document.getElementById('game-intro').style.display = 'none';
        this.gameArea.style.display = 'block';
        this.gameInterval = setInterval(() => this.update(), this.gameLoopFrequency);
        this.populateAliens();
        this.setupEventListeners();
    }
          //creates 10 aliens and positions them in a row //need to be update
    populateAliens() {
        const alienCount = 10;
        const alienWidth = 50;
        const gameAreaWidth = this.gameArea.offsetWidth;
        //const gap = (gameAreaWidth - alienCount * alienWidth) / (alienCount + 1); //tryna calcul. the gap btwn alien here

        // Calculate starting x-coordinate so aliens are centered in the game area
        const startX = (gameAreaWidth - alienCount * alienWidth) / 2;
        for (let i = 0; i < alienCount; i++) { 
            const x = startX + i * alienWidth;
            //const x = gap + i * (alienWidth + gap); //tryna calcul. x 
            this.aliens.push(new Alien(this.gameArea, x, 50));
        }

        //for (let i = 0; i < 10; i++) { 
            //this.aliens.push(new Alien(this.gameArea, i * 60 + 50, 50));
        //}
    }

    setupEventListeners() {
        window.addEventListener('keydown', event => {
            if (event.keyCode === 37) { // left arrow
                this.player.move('left');
            } else if (event.keyCode === 39) { // right arrow
                this.player.move('right');
            } else if (event.keyCode === 32) { // space bar
                this.bullets.push(new Bullet(this.gameArea, this.player.x + this.player.width / 2 - 2.5, this.player.y - 50));
                                                                                              // ^ position of bullet here
            }
        });
    }

    update() {
        this.aliens.forEach(alien => alien.move(0, 0));
        this.bullets.forEach((bullet, index) => {
            bullet.move();
            if (bullet.y < 0) {
                bullet.remove();
                this.bullets.splice(index, 1);
            }
        });
        //if alien got hit by bullet
        this.aliens.forEach((alien, alienIndex) => {
            this.bullets.forEach((bullet, bulletIndex) => {
                if (bullet.collidesWith(alien)) {//if alien got hit by bullet
                    alien.hit(); //call hit medthod in alien class
                    bullet.remove();
                    this.aliens.splice(alienIndex, 1);
                    this.bullets.splice(bulletIndex, 1);
                    this.score += 10; // counting score here 
                    this.updateDisplay();
                }
            });
        });

        if (this.aliens.length === 0) {
            console.log("Win??");
            this.endGame();
        }
    }
    updateDisplay(){
        document.getElementById('score').textContent = 'Score: ' + this.score;
        document.getElementById('lives').textContent = 'Lives: ' + this.lives;
    }



    endGame(message) {
        clearInterval(this.gameInterval);
        this.gameArea.style.display = 'none';
        const gameEndScreen = document.getElementById('game-end');
        gameEndScreen.style.display = 'block';

        //need to be update html&css
        gameEndScreen.querySelector('div').textContent = message;
    }
}

