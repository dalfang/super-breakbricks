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
        //this.dx = Math.random() < 0.5 ? -1 : 1; // ramdom assigns a horizontal direct. -1 for left or 1 for right
        //this.dy = 1;
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
        //if (this.x  <= 35) {
        //    this.x = 35;
        //}
        //if (this.x >= 465 - this.width) {
        //this.x = 465 - this.width;
        //}
        //this.updatePosition();
    }

    //move(dx, dy) {
        //if (Math.random() < 0.1) {
        //    this.dx = -this.dx;
        //}
        //this.y += dy;
        //this.x += this.dx * 5;
        //this.y += this.dy * 0.1;
        //if (this.x < 0 || this.x > this.gameArea.width) {
        //    this.dx = -this.dx;
        //}
    //}

    updatePosition() {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
    //hit and alien gone
    hit() {
        this.gameArea.removeChild(this.element);
    }
}
