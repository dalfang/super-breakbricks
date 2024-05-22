class Alien {
    constructor(gameArea, x ,y) {
        this.gameArea = gameArea;
        this.x = x; //left x start from 0
        this.y = 0; //top y
        this.width = 20;
        this.height = 10;
        this.element = document.createElement('div'); //create new div as alien
        this.element.className = 'alien';
        //this.dx = Math.random() < 0.5 ? -1 : 1; // ramdom assigns a horizontal direct. -1 for left or 1 for right
        //this.dy = 7;
        this.gameArea.appendChild(this.element); 
        this.updatePosition();
    }

    move(){
        this.top += 2;
        this.updatePosition();
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
