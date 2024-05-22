class Game {
    constructor(gameArea) {
        this.gameArea = gameArea;
        this.height = 1880
        this.width = 1614;
        this.score = 0;
        this.lives = 3000;
        this.speed = 1;
        this.aliens = []//[new Alien(this.gameArea, this.speed)]; //array to hold alien objects.
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
        const alienWidth = 70;
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
    // Move player based on mouse movement
    window.addEventListener('mousemove', event => {
        const gameAreaRect = this.gameArea.getBoundingClientRect();
        const mouseX = event.clientX - gameAreaRect.left;
        const halfPlayerWidth = this.player.width / 2;

        // Keep the player within the game area boundaries
        this.player.x = Math.min(Math.max(mouseX - halfPlayerWidth, 0), gameAreaRect.width - this.player.width);
        this.player.updatePosition();
    });

    // Fire bullets on mouse click
    window.addEventListener('click', event => {
        const bulletX = this.player.x + this.player.width / 2 - 2.5;
        const bulletY = this.player.y - 50;
        this.bullets.push(new Bullet(this.gameArea, bulletX, bulletY));
    });
}
        update() {

        this.aliens.forEach((alien, index) => {
            alien.move();
            this.lives = 3;
            if (this.checkCollision(this.player, alien)) {
                alien.hit()
                this.lives -= 1;
                this.updateDisplay();
                this.aliens.splice(index, 1);
            if (this.lives === 0) {
                this.endGame();
                }
            }
        });

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


    ///try to make the colistion here
    checkCollision(player, alien) {
        const playerRect = player.element.getBoundingClientRect();
        const alienRect = alien.element.getBoundingClientRect();
    
        return !(playerRect.right < alienRect.left ||
                 playerRect.left > alienRect.right ||
                 playerRect.bottom < alienRect.top ||
                 playerRect.top > alienRect.bottom);
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

