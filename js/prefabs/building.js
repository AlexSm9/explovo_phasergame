// -- Generic Building
var Building = function(game, x, y, health, fires, key, src){
	
	// Creation Code
	Phaser.Sprite.call(this, game, x, y, key, src); // call sprite
	game.physics.enable(this, Phaser.Physics.ARCADE); // enable physics
	this.body.immovable = true; // dsable movement
	this.body.moves = false;
	//this.anchor.set(0.5,0.5); // set anchor to center
	this.game.add.existing(this);
	
	// Parameters
	this.health = health; // default hp set
	this.fireCount = 0;
	this.fireGroup = this.game.add.group(); // generate fire group
	this.fireRed = 0;
	// start # of fires
	for( let i = 0; i < fires; i++){
		this.startFire();
	}
};

Building.prototype = Object.create(Phaser.Sprite.prototype);
Building.prototype.constructor = Building; // creation call

Building.prototype.update = function(){
	if(this.health > 0){
		this.health -= this.fireCount * 0.1;
	}
	else{
		this.fireGroup.removeAll(true);
		this.fireCount = 0;
		this.loadTexture('buildingDestroyed',0);
	}
};

// startFire
// Starts a fire on this building
Building.prototype.startFire = function(){
	// generate fire randomly over this sprite and add to fire group
	var fire = this.game.add.sprite(this.x + this.game.rnd.integerInRange(0,this.width-100),this.y + this.game.rnd.integerInRange(0,this.height-100),'fire');
	//fire.anchor.setTo(0.5,0.5);
	this.game.add.existing(fire);
	this.fireGroup.add(fire);
	// increase fire count
	this.fireCount += 1;
};

Building.prototype.damageFire = function(emitter,building){
	// if the building has any fires
	if(this.fireCount > 0){
		this.fireRed += 1; // increase fire decrease timer
		if(this.fireRed > 100 ){ // if it hits a certain threshold
			this.fireGroup.removeChild(this.fireGroup.getRandom()); // remove a fire
			this.fireCount -= 1; // lower fire count
			this.fireRed = 0; // reset counter
			console.log(this.fireCount);
		}
	}
}
