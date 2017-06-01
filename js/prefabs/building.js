// -- Generic Building
var Building = function(game, x, y, health, fires, key, src){
	this.saved = game;
	// Creation Code
	Phaser.Sprite.call(this, game, x-50, y-50, key, src); // call sprite
	this.frame = 0;
	this.animations.add('onFire', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, true);
	game.physics.enable(this, Phaser.Physics.ARCADE); // enable physics
	this.body.immovable = true; // dsable movement
	this.body.moves = false;
	this.body.setSize(this.width-100, this.height-100, 50, 50);
	//this.anchor.set(0.5,0.5); // set anchor to center
	
	this.game.add.existing(this);
	
	// Parameters
	this.health = health; // default hp set
	this.damageMult = 0.001; // damage multiplier
	this.fireLevel = 0;
	this.unBurnt = true;
	//this.fireGroup = this.game.add.group(); // generate fire group
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
	//console.log(this.health);
	//console.log(this.fireLevel);
	
	if (this.fireLevel > 0){
		// movement of the fire indicator
		this.indicator.rotation = this.saved.physics.arcade.angleBetween(this,this.indicator);
		this.indicator.x = this.saved.camera.target.x;
		this.indicator.y = this.saved.camera.target.y;
		
		this.animations.play('onFire');
	}
	else{
		if(this.indicator!==undefined){
			this.indicator.kill();
		}
		this.frame = 0;
	}
	if(this.health > 0 && this.unBurnt == true){
		this.health -= this.fireLevel * this.damageMult;
	}
	else{
		this.fireLevel = 0;
		this.frame = 11;
		this.unBurnt = false;
	}
};

// startFire
// Starts a fire on this building
Building.prototype.startFire = function(){
	this.fireLevel += 100;
	
	/*
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
	this.fireGroup.add(fire);*/
	if(this.fireLevel > 0 && this.indicator==undefined){
		// fire indicator
		this.indicator = this.saved.add.sprite(this.saved.camera.target.x,this.saved.camera.target.y,'indi');
		this.indicator.anchor.setTo(0.5,0.5);
	}
	// sound goes here
};

Building.prototype.damageFire = function(particle){
	if(this.fireLevel > 0) this.fireLevel -= .5;
}
