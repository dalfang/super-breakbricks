class Bullet {
    constructor(gameArea, x, y, speed) {
        this.gameArea = gameArea;
        this.x = x; // ซ้าย
        this.y = y; // 
        this.element = document.createElement('div'); //สร่างเอเลียนมาใหม่
        this.element.className = 'bullet'; //อันนี้เอาใปใช้ตกแต่งในcss
        this.gameArea.appendChild(this.element);
        this.updatePosition();
        this.speed = speed
    }

    move() {
        this.y -= this.speed; // // speed will determine direction: negative for upward, positive for downward
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
        console.log( "shooting");
        return this.x < alien.x + 2 && this.x + 2 > alien.x && // ซ้ายหรอ เริ่มจาก0
               this.y < alien.y + 10 && this.y + 6 > alien.y; // ขวาหรอ เริ่มจาก0
    }

}
