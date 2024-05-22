class Bullet {
    constructor(gameArea, x, y) {
        this.gameArea = gameArea;
        this.x = x; // ซ้าย
        this.y = y; // จากบน
        this.element = document.createElement('div'); //สร่างเอเลียนมาใหม่
        this.element.className = 'bullet'; //อันนี้เอาใปใช้ตกแต่งในcss
        this.gameArea.appendChild(this.element);
        this.updatePosition();
    }

    move() {
        this.y -= 7; // move the bullet upwards
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    remove() {
        this.gameArea.removeChild(this.element);
    }


    //when boulet hit alien position //need to be uddate 
    collidesWith(alien) {
        return this.x < alien.x + 70 && this.x + 10 > alien.x &&
               this.y < alien.y + 30 && this.y + 20 > alien.y;
    }
}
