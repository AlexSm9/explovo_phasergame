// -- Generic Building
// Get fire count with this.fireGroup.countLiving()
// Buildings should be named building01-01, building01-02, etc subject to change
// Example - "MemeFactory-01.png" for alive "MemeFactory-02.png" for dead
// May extend for animations if necessary
var Building = function(game, x, y, health, fires, src){
	// initalization
	this.game = game;
	this.src = src + '-01';
	this.srcDestroyed = src + '-02';
	// Creation Code
	Phaser.Sprite.call(this, game, x, y, 'buildings', this.src); // call sprite
	game.physics.enable(this, Phaser.Physics.ARCADE); // enable physics
	this.body.immovable = true; // dsable movement
	this.body.moves = false;
	this.anchor.set(0.5,0.5); // set anchor to center
	this.game.add.existing(this);
    
    // add sounds
    this.collapse = game.add.audio('collapse');
    
	//this.count = game.add.text(740,35, 'X ' + this.fireCount,{fontSize: '25px',fill:'yellow'});
	//this.count.fixedToCamera=true;
	this.isDead = false;

	// Parameters
	this.health = health; // default hp set
	this.damageMult = 0.1; // damage multiplier
	this.fireGroup = this.game.add.group(); // generate fire group
	// start # of fires
	for( let i = 0; i < fires; i++){
		let j = game.rnd.integerInRange(-2,3);
		this.startFire(j);
	}
	// debug
	// this.starterFire = game.input.keyboard.addKey(Phaser.Keyboard.T);
};

Building.prototype = Object.create(Phaser.Sprite.prototype);
Building.prototype.constructor = Building; // creation call

Building.prototype.update = function(){
	// Indicator management
	if (this.fireGroup.countLiving() > 0){
		// movement of the fire indicator
		this.indicator.rotation = this.game.physics.arcade.angleBetween(this,this.indicator);
		this.indicator.x = this.game.camera.target.x;
		this.indicator.y = this.game.camera.target.y;
	}
	else{
		if(this.indicator!==undefined){
			this.indicator.kill();
		}
	}

	// Building health damage
	if(this.health > 0){
		this.health -= this.fireGroup.countLiving() * this.damageMult;
	}
	else{
		this.isDead = true;
        this.fireGroup.forEach(this.stopFireSound, this, true);
		this.fireGroup.removeAll(true);
		this.loadTexture('buildings', this.srcDestroyed);
	}
    
    // play collapse sound
    if(this.health > 0 && this.health < 1 && !this.collapse.isPlaying) {
        this.collapse.play('', 0, 1, false);
    }
	// Debug code
	/*this.fireGroup.forEach(function(fire){
		this.saved.debug.body(fire);
	},this);*/
};

// startFire
// Starts a fire on this building

// Accepts a side in radians and generates a random fire
Building.prototype.startFire = function(side){    
	// Get the side of the building that was lit
	var angle = rToA(side);
	if (angle >= -45 && angle <= 45){ // left
		var xpos = (this.x - this.width/2);
		var ypos = (this.y - this.height/2) + this.game.rnd.integerInRange(0,this.height-69);
		var ang = 270;
	}
	else if( angle >= 46 && angle <= 135){ // top
		var xpos = (this.x - this.width/2) + this.game.rnd.integerInRange(0,this.width-48);
		var ypos = (this.y - this.height/2);
		var ang = 0;
	}
	else if( angle >= -135 && angle <= -44){ // bottom
		var xpos = (this.x - this.width/2) + this.game.rnd.integerInRange(0,this.width-69);
		var ypos = (this.y - this.height/2) + this.height - 4;
		var ang = 180;
	}
	else{ // right
		var xpos = (this.x - this.width/2) + this.width-4; // accounting for shadows
		var ypos = (this.y - this.height/2) + this.game.rnd.integerInRange(0,this.height-48);
		var ang = 90;
	}

	// create a fire and add to group based on parameters
	var fire = new Fire(this.game, xpos, ypos, ang);
	this.game.world.moveUp(fire);
  	this.fireGroup.add(fire);
	if(this.fireGroup.countLiving() == 1){
		// fire indicator
		this.indicator = this.game.add.sprite(this.game.camera.target.x,this.game.camera.target.y,'assets','fireIndicator');
		this.indicator.anchor.setTo(0.5,0.5);
	}

};

Building.prototype.damageFire = function(particle,fire){
	fire.damage();
};

Building.prototype.stopFireSound = function(fire) {
    fire.fire_sound.stop();
}