let game;  // declare game globally

window.onload = function() {
    const gameArea = document.getElementById("gameArea"); // get the game area
    const startButton = document.getElementById("start-game-button");
    const restartButton = document.getElementById("restart-button");
    ourGame = new Game(gameArea);  // pass the gameArea to the Game constructor

    startButton.addEventListener("click", function() {
        ourGame.start();  // start the game
    });

    restartButton.addEventListener("click", function() {
        window.location.reload();  // reload the page to restart the game
    });

};

window.addEventListener('DOMContentLoaded', (event) => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play(); 

    const musicToggle = document.getElementById('musicToggle');
    musicToggle.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play(); 
        } else {
            backgroundMusic.pause();
        }
    });
});


