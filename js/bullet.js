class Bullet {
    constructor(gameArea, x, y) {
        this.gameArea = gameArea;
        this.x = x; // ซ้าย
        this.y = y; // 
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


    //when bullet hit alien position //need to be uddate 
    collidesWith(alien) {
        return this.x < alien.x + 10 && this.x + 5 > alien.x && // ซ้ายหรอ เริ่มจาก0
               this.y < alien.y + 1000 && this.y + 600 > alien.y; // ขวาหรอ เริ่มจาก0
    }

}
