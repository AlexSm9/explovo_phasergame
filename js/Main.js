window.onload = function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO);
	game.state.add("stBoot", stBoot);
	game.state.add("stPreloader", stPreload);
	game.state.add("stDirections", stDirections);
	game.state.add("stContext1", stContext1);
	game.state.add("stContext2", stContext2);
	game.state.add("stContext3", stContext3);
	game.state.add("stGameOver", stGameOver);
    game.state.add("stTitle", stTitle);
	game.state.add("stGame", stGame);
	//start the first state
	game.state.start("stBoot");
};
