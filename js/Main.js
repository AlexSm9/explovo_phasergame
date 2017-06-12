// Main File
// Instantiates and adds all the states to the game
window.onload = function() {
    var config = {
        width: 800,
        height:600,
        renderer: Phaser.AUTO
    }
    var game = new Phaser.Game(config);
    game.state.add("stBoot", stBoot);
    game.state.add("stPreloader", stPreload);
    game.state.add("stTutorialLevel", stTutorialLevel);
    game.state.add("stDirections", stDirections);
    game.state.add("stContext1", stContext1);
    game.state.add("stContext2", stContext2);
    game.state.add("stContext3", stContext3);
    game.state.add("stGameOver", stGameOver);
    game.state.add("stWin",stWin);
    game.state.add("stTitle", stTitle);
    game.state.add("stGame", stGame);
    game.state.add("stGame2", stGame2);
    game.state.add("stGame3", stGame3);
    //start the first state
    game.state.start("stBoot");
};
