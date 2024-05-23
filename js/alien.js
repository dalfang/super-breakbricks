class Alien {
    constructor(gameArea, x ,y) {
        this.gameArea = gameArea;
        this.x = x; //left x start from 0
        this.y = y; //top y
        this.width = 5;
        this.height = 10;
        this.directionX = Math.random() < 0.5 ? -1 : 1;
        this.directionY = 0.3;
        this.element = document.createElement('div'); //create new div as alien
        this.element.className = 'alien';
        this.gameArea.appendChild(this.element); 
        this.updatePosition();
    }

    move(){
        //this.y += 1;
        this.x += this.directionX;
        this.y += this.directionY;
        if (this.x <= 0 || this.x >= this.gameArea.offsetWidth - this.width) {
            this.directionX = -this.directionX;
        }
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
    //hit and alien gone
    hit() {
        this.gameArea.removeChild(this.element);
    }
}
class ShootingAlien extends Alien {
    constructor(gameArea, x, y) {
        super(gameArea, x, y);
        this.element.className = 'shooting-alien';
        this.shootingInterval = setInterval(() => this.shoot(), 2000);
    }

    shoot() {
        const bulletX = this.x + this.width / 2 - 2.5;
        const bulletY = this.y + this.height;
        this.gameArea.dispatchEvent(new CustomEvent('alienShoot', {
            detail: { x: bulletX, y: bulletY, }
        }));
    }

    hit() {
        clearInterval(this.shootingInterval);
        super.hit();
    }
}

class BigAlien extends Alien {
    constructor(gameArea, x, y) {
        super(gameArea, x, y);
        this.element.className = 'big-alien';
        this.element.style.width = '80px'; // Bigger size
        this.element.style.height = '80px';
    }  
}

class BossAlien extends Alien {
    constructor(gameArea, x, y) {
        super(gameArea, x, y);
        this.health = 100; // Boss alien has more health
        this.element.className = 'boss-alien'; // Custom style
        this.element.style.width = '100px'; // Larger size
        this.element.style.height = '50px';
        this.directionX = 3;
    }

    hit() {
        this.health--;
        this.blink();
        if (this.health <= 0) {
            this.gameArea.removeChild(this.element);
            return true; // Return true to indicate the boss is defeated
        }
        return false; // Boss is not yet defeated
    }

    blink() {
        const originalDisplay = this.element.style.display;
        this.element.style.display = 'none';

        setTimeout(() => {
            this.element.style.display = originalDisplay;
        }, 100); // blink duration
    }

    move(){
        this.x += this.directionX;
        this.y += this.directionY;
        if (this.x <= 0 || this.x >= this.gameArea.offsetWidth - this.width) {
           this.directionX = -this.directionX;
        }
       this.updatePosition();
        }


    updatePosition() {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}

