window.onload = function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO);
	game.state.add("stBoot", stBoot);
	game.state.add("stPreloader", stPreload);
    game.state.add("stTitle", stTitle);
	game.state.add("stGame", stGame);
	//start the first state
	game.state.start("stBoot");
};
