window.onload = function() {
	var game = new Phaser.Game(896, 1152, Phaser.AUTO);
	game.state.add("stBoot", stBoot);
	game.state.add("stPreloader", stPreloader);
	game.state.add("stGame", stGame);
	//start the first state
	game.state.start("stBoot");
}