
class Game {
    constructor(gameArea) {
        this.gameArea = gameArea;
        this.height = 380
        this.width = 214;
        this.score = 0;
        this.lives = 10;
        this.speed = 1;
        this.bossHealth = 50;
        this.aliens = [];
        this.bullets = [];//array to hold bullet objects.
        this.player = new Player(
            this.gameArea,
            250,
            290); // player size x, y here
        this.player.setImage('./img/ironman.png'); // i set the player image


        
        this.gameInterval = null;
        this.gameLoopFrequency = 1000 / 60;
        this.updateDisplay(); //the score and lives display
        this.setupEventListeners();
       
        this.shootSound = new Audio('./sound/shoot.wav');
        this.shootSound.volume = 0.015;
        this.bossSound = new Audio('./sound/bosshuh.mp3')
        this.bossSound.volume = 0.015;
        this.backgroundMusic = document.getElementById('backgroundMusic');
        this.backgroundMusic.volume = 0.015;
        
        
        this.boss = null;
        this.alienBullets = [];
        this.gameArea.addEventListener('alienShoot', (event) => {
            const { x, y } = event.detail;
            this.alienBullets.push(new Bullet(this.gameArea, x, y, -7, )); //alien bullet
        });   
    }

    start() {
        document.getElementById('game-intro').style.display = 'none';
        this.gameArea.style.display = 'block';
        this.gameInterval = setInterval(() => this.update(), this.gameLoopFrequency);
        this.populateAliens();
        this.setupEventListeners();
        this.sequenceSpawnAliens();
        setTimeout(() => this.spawnBossAlien(), 15000); //boss spawns time
        
    }
          //creates 10 aliens and positions them in a row //need to be update
    populateAliens() {
        const alienCount = 3;
        const shootingAlienCount = 8;
        const alienWidth = 60; 
        const gameAreaWidth = this.gameArea.offsetWidth;

        const startX = (gameAreaWidth - (alienCount + shootingAlienCount) * alienWidth) / 2;
        for (let i = 0; i < alienCount; i++) { 
            const x = startX + i * alienWidth;
            this.aliens.push(new Alien(this.gameArea, x, 10));//position to spaw 
        }
        for (let i = 0; i < shootingAlienCount; i++) {
            const x = startX + (alienCount + i) * alienWidth;
            this.aliens.push(new ShootingAlien(this.gameArea, x, 10));
        }    
    }

    spawnAliensContinuously() {
        const spawnInterval = 1700;  
    
        const spawn = () => {
            const typeIndex = Math.floor(Math.random() * 3); 
            const types = ['normal', 'shooting', 'big', 'bigBoss'];
            const type = types[typeIndex];
            this.createAlien(type);
    
            setTimeout(spawn, spawnInterval); 
        };
    
        setTimeout(spawn, spawnInterval);
    }

    sequenceSpawnAliens() {
        this.spawnAliensContinuously();
    }


    createAlien(type) {
        const x = Math.random() * (this.gameArea.offsetWidth - 50);
        const y = 40;  // Spawn height
        if (type === 'normal') {
            this.aliens.push(new Alien(this.gameArea, x, y));
        } else if (type === 'shooting') {
            this.aliens.push(new ShootingAlien(this.gameArea, x, y));
        } else if (type === 'big') {
            this.aliens.push(new BigAlien(this.gameArea, x, y));
        } 
    }
    //Gonna add the boss sound effect here
    spawnBossAlien() {
        const x = (this.gameArea.offsetWidth - 100) / 2; 
        const y = 12;
        this.boss = new BossAlien(this.gameArea, x, y);
        this.aliens.push(this.boss);


        setTimeout(() => {
            let opacity = 1.0; 
            const fadeInterval = setInterval(() => {
                opacity -= 0.1; 
                if (opacity <= 0) {
                    clearInterval(fadeInterval); 
                    if (this.boss) {
                        const index = this.aliens.indexOf(this.boss);
                        if (index > -1) {
                            this.aliens.splice(index, 1); 
                        }
                        this.boss.element.parentNode.removeChild(this.boss.element); 
                        this.boss = null; 
                        this.endGame();
                    }
                } else {
                    this.boss.element.style.opacity = opacity; // update the opacity
                }
            }, 10000); // run every 100 milliseconds
        }, 35000); // fasde after this time seconds
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
            this.bullets.push(new Bullet(this.gameArea, bulletX, bulletY, +7,));

            ///I"m gonna add the shoot ound here
            this.shootSound.play();
            this.shootSound.currentTime = 0;

        });
    }


    update() {
        //player got hit by alien
        this.aliens.forEach((alien, index) => {
            alien.move();
            if (this.checkCollision(this.player, alien)) {
                alien.hit();
                if (alien instanceof BossAlien) {
                    this.endGame('Game Over ! Hit by Boss');
                    return;
                }    
                this.lives -= 1;
                this.updateDisplay();
                this.aliens.splice(index, 1);
            if (this.lives === 0) {
                this.endGame('Game Over');
                }
            }
        });

        this.bullets.forEach((bullet, index) => {
            bullet.move();
            if (bullet.y < 0) {
                bullet.remove();
                this.bullets.splice(index, 1);``
            }
        });

        //bullet hits the alien
        this.alienBullets.forEach((bullet, index) => {
            bullet.move();
            if (bullet.y > this.gameArea.offsetHeight) {
                bullet.remove();
                this.alienBullets.splice(index, 1);
            }
            if (this.checkCollision(this.player, bullet)) {
                bullet.remove();
                this.alienBullets.splice(index, 1);
                this.lives -= 1;
                this.updateDisplay();
                if (this.lives === 0) {
                    this.endGame('Game Over! You lose! ');
                }
            }
        });

        this.aliens.forEach((alien, alienIndex) => {
            this.bullets.forEach((bullet, bulletIndex) => {
                if (this.checkCollision(bullet, alien)) { // if alien got hit by bullet
                    bullet.remove();
                    this.bullets.splice(bulletIndex, 1);
    
                    if (alien instanceof BossAlien) {
                        this.bossHealth -= 1;
                        this.bossSound.play();


                        if(this.bossHealth <=0){
                            alien.hit();
                            this.aliens.splice(alienIndex, 1);
                            this.boss = null;// Ensure boss is no longer referenced
                            this.score += 50; 
                            this.updateDisplay();
                            this.endGame('You win!' );
                        } else {
                            this.score += 5; 
                            this.updateDisplay();
                        }
                    } else {
                        alien.hit(); // call hit method in alien class
                        this.aliens.splice(alienIndex, 1);
                        this.score += 10; 
                        this.updateDisplay();
                    }
                }
            });
        });
    }

    updateDisplay(){
        document.getElementById('score').textContent = 'Score: ' + this.score;
        document.getElementById('lives').textContent = 'Lives: ' + this.lives;
        document.getElementById('boss-health').textContent = 'Boss: ' + this.bossHealth;

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
       if (this.boss){
           document.getElementById('boss-health').textContent = 'Boss Health: ' + this.boss.health;
        }
    }
    
}
