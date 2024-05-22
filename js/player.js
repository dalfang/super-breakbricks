class Player {
    constructor(gameArea, left, top) {
        this.gameArea = gameArea;
        this.element = document.getElementById('player');
        this.width = 90; //ขนาดplayer
        this.height = 90; //ต้องแก้
        this.x = left;
        this.y = top;
        this.element.style.position = 'absolute';
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    setImage(imageUrl) {
        this.element.style.backgroundImage = `url(${imageUrl})`;
        this.element.style.backgroundSize = 'cover';
    }
    move(direction) {
        const step = 10; 
        if (direction === 'left') {
            this.x = Math.max(0, this.x - step);
        } else if (direction === 'right') {
            this.x = Math.min(this.gameArea.offsetWidth - this.width, this.x + step);
        }
        this.updatePosition();
    }
}
