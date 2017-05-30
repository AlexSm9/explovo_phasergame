// -- Generic Building
var Building = function(game, x, y, health, fires, key, src){
	this.saved = game;
	// Creation Code
	Phaser.Sprite.call(this, game, x, y, key, src); // call sprite
	game.physics.enable(this, Phaser.Physics.ARCADE); // enable physics
	this.body.immovable = true; // dsable movement
	this.body.moves = false;
	this.anchor.set(0.5,0.5); // set anchor to center
	this.game.add.existing(this);
	
	// Parameters
	this.health = health; // default hp set
	this.damageMult = 0.1; // damage multiplier
	this.fireGroup = this.game.add.group(); // generate fire group
	// start # of fires
	for( let i = 0; i < fires; i++){
		this.startFire();
	}
	// debug
	// this.starterFire = game.input.keyboard.addKey(Phaser.Keyboard.T);
};

Building.prototype = Object.create(Phaser.Sprite.prototype);
Building.prototype.constructor = Building; // creation call

Building.prototype.update = function(){
	/*if(this.starterFire.isDown){
		console.log('fire started');
		this.startFire();
	}*/
	
	if (this.fireGroup.countLiving() > 0){
		// movement of the fire indicator
		this.indicator.rotation = this.saved.physics.arcade.angleBetween(this,this.indicator);
		this.indicator.x = this.saved.camera.target.x;
		this.indicator.y = this.saved.camera.target.y;
	}
	else{
		this.indicator.kill();
	}
	if(this.health > 0){
		this.health -= this.fireGroup.countLiving() * this.damageMult;
	}
	else{
		this.fireGroup.removeAll(true);
		this.loadTexture('buildingDestroyed',0);
	}
};

// startFire
// Starts a fire on this building
Building.prototype.startFire = function(){
	// generate fire randomly over this sprite and add to fire group
	var angle = this.game.rnd.integerInRange(0,3);
	// get a random side of the building
		switch(angle){
			case 0: // 0
				// accounting for 0.5 anchor
				var xpos = (this.x - this.width/2) + this.game.rnd.integerInRange(0,this.width-48);
				var ypos = (this.y - this.height/2);
				var ang = 0;
				break;
			case 1: // 90
				var xpos = (this.x - this.width/2) + this.width-4; // accounting for shadows
				var ypos = (this.y - this.height/2) + this.game.rnd.integerInRange(0,this.height-48);
				var ang = 90;
				break;
			case 2: // 180
				var xpos = (this.x - this.width/2) + this.game.rnd.integerInRange(0,this.width-69);
				var ypos = (this.y - this.height/2) + this.height - 4;
				var ang = 180;
				break;
			case 3: // 270
				var xpos = (this.x - this.width/2);
				var ypos = (this.y - this.height/2) + this.game.rnd.integerInRange(0,this.height-69);
				var ang = 270;
				break;
		}
	// create a fire and add to group based on parameters
	var fire = new Fire(this.game, xpos, ypos, ang);
	this.game.world.moveUp(fire);
	this.fireGroup.add(fire);
	if(this.fireGroup.countLiving() == 1){
		// fire indicator
		this.indicator = this.saved.add.sprite(this.saved.camera.target.x,this.saved.camera.target.y,'indi');
		this.indicator.anchor.setTo(0.5,0.5);
	}
	// sound goes here
};

Building.prototype.damageFire = function(particle,fire){
	fire.damage();
}

/*Building.prototype.render = function(){
	this.fireGroup.forEach(function(fire){
			this.game.debug.body(fire);
		},this);
};*/