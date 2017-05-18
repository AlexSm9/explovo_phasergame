// Water UI
// Reads water level from player object and scales UI element to it
var WaterUI = function(game, player, x, y){
	this.player = player;
	// Adjust parameters for inner part of the UI
	this.uiInner = game.add.image(x,y,'WaterLevel');
	this.uiInner.anchor.set(0,0.5);
	this.uiInner.fixedToCamera = true;
	this.uiInner.cameraOffset.setTo(x,y);
	this.uiInner.scale.x = this.player.waterLevel/this.player.waterLevelTotal;
	
	// Adjust parameters for the outer part of the UI
	this.uiOuter = game.add.image(x-50,y-40,'WaterBar');
	this.uiOuter.fixedToCamera = true;
	this.uiOuter.cameraOffset.setTo(x-50,y-40);
};

WaterUI.prototype = Object.create(Phaser.Sprite.prototype);
WaterUI.prototype.constructor = WaterUI; // creation call

WaterUI.prototype.update = function(){
	this.uiInner.scale.x = this.player.waterLevel/this.player.waterLevelTotal;
};