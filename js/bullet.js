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
        this.y -= this.speed; // speed will determine direction: negative for upward, positive for downward
        this.updatePosition();

        
    }

    updatePosition() {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    remove() {
        this.gameArea.removeChild(this.element);
    }


    collidesWith(alien) {
        return this.x < alien.x + alien.width && 
               this.x + 8 > alien.x && 
               this.y < alien.y + alien.height && 
               this.y + 90 > alien.y; 
    }
}
