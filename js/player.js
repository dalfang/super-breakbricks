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
    //moves the player left or right based keybord set up medt.
    move(direction) {
        const maxPlayerX = this.gameArea.offsetWidth - this.width;
        if (direction === 'right' && this.x < maxPlayerX) {
            this.x += 7;
        } else if (direction === 'left' && this.x > 0) {
            this.x -= 7;
        }
        this.updatePosition();
    }

    setImage(imageUrl) {
        this.element.style.backgroundImage = `url(${imageUrl})`;
        this.element.style.backgroundSize = 'cover';
    }
}
