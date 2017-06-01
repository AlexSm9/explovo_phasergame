// -- ThrownObject
var ThrownObject = function(game, spriteObject, positionX, positionY, sounds) {
	// initialize variable
   Phaser.Sprite.call(this, game, positionX, positionY, spriteObject.key, spriteObject.frame);
	this.anchor.set(0.5,0.5); // set anchor to center
	game.physics.enable(this);

	// add this object to the game
	this.game.add.existing(this);

	this.collideWithBuildingEnable = false;
	this.inProgress = false;
	this.building = null;

};

ThrownObject.prototype = Object.create(Phaser.Sprite.prototype);
ThrownObject.prototype.constructor = ThrownObject;

ThrownObject.prototype.update = function() {

	//enable rotation
	this.rotation += 0.1;

	if(this.collideWithBuildingEnable === true){
		if(this.game.physics.arcade.overlap(this, this.building)){
			this.building.startFire();
			this.destroy();
		}
	}
};
ThrownObject.prototype.throwAtBuilding = function(building, velocity){
	this.building = building;
	this.collideWithBuildingEnable = true;
	dX = building.centerX-this.x;
	dY = building.centerY-this.y;
	if(this.inProgress === false){
		this.inProgress = true;
	}
	n = normalize(dX, dY);
	this.body.velocity.x = n.x*velocity;
	this.body.velocity.y = n.y*velocity;
};
