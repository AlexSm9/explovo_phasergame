// -- Generic Building
// Get fire count with this.fireGroup.countLiving()
// Buildings should be named building01-01, building01-02, etc subject to change
// Example - "MemeFactory-01.png" for alive "MemeFactory-02.png" for dead
// May extend for animations if necessary
var Building = function(game, x, y, health, fires, src, width, height, bodyWidth, bodyHeight){
	// initalization
	this.game = game;
	this.src = src + '-01';
	this.srcMid = src + '-02';
	this.srcDestroyed = src + '-03';
	// Creation Code
	Phaser.Sprite.call(this, game, x, y, 'buildings', this.src); // call sprite
	game.physics.enable(this, Phaser.Physics.ARCADE); // enable physics
	this.body.immovable = true; // dsable movement
	this.body.moves = false;
	this.body.setSize(bodyWidth, bodyHeight, ((this.width - bodyWidth)/2), ((this.height - bodyHeight)/2));
	this.height = height;
	this.width = width;
	this.anchor.set(0.5,0.5); // set anchor to center
	this.game.add.existing(this);

    // add sounds
    this.collapse = game.add.audio('collapse');

	// Set Dead flag
	this.isDead = false;

	// Parameters
	this.health = health; // default hp set
	this.total = health; // max health
	this.damageMult = 0.1; // damage multiplier
	this.fireGroup = this.game.add.group(); // generate fire group
	this.foamGroup = this.game.add.group();
	this.mid = new Phaser.Signal();
	this.mid.addOnce(this.midDestroy,this);

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

	// at half health, load mid destroy sprite
	if (this.health/this.total <= 0.50){
		this.mid.dispatch();
	}

	// Building health damage
	if(this.health > 0){
		this.health -= this.fireGroup.countLiving() * this.damageMult;
	}
	else{
		this.isDead = true;
		this.alive = false;
        this.fireGroup.forEach(this.stopFireSound, this, true);
		this.fireGroup.removeAll(true);
		this.loadTexture('buildings', this.srcDestroyed);
	}

    // play collapse sound
    if(this.health > 0 && this.health < 1 && !this.collapse.isPlaying) {
        this.collapse.play('', 0, 1, false);
		this.game.camera.shake(0.005,1000,true,Phaser.Camera.SHAKE_BOTH,false);
    }
	// Debug code
	/*this.fireGroup.forEach(function(fire){
		this.saved.debug.body(fire);
	},this);*/
		this.game.debug.body(this);

};

// startFire
// Starts a fire on this building

// Accepts a side in radians and generates a random fire
Building.prototype.startFire = function(side,x,y){
	// Get the side of the building that was lit
	var angle = rToA(side);
	if (angle >= -45 && angle <= 45){ // left
		var xpos = (this.body.x);
		var ypos = Phaser.Math.clamp((this.body.y) + (y - this.body.y - 30),this.body.y,this.body.y + this.height-60);
		var ang = 270;
	}
	else if( angle >= 45 && angle <= 135){ // top
		var xpos = Phaser.Math.clamp((this.body.x) + (x - this.body.x - 34), this.body.x, this.body.x+this.width-68);
		var ypos = (this.body.y);
		var ang = 0;
	}
	else if( angle >= -135 && angle <= -45){ // bottom
		var xpos = Phaser.Math.clamp((this.body.x) + (x - this.body.x - 30),this.body.x,this.body.x+this.width-68);
		var ypos = (this.body.y + this.body.height);
		var ang = 180;
	}
	else{ // right
		var xpos = (this.body.x + this.body.width); // accounting for shadows
		var ypos = Phaser.Math.clamp((this.body.y) + (y - this.body.y - 34), this.body.y,this.body.x+this.height-68);
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

Building.prototype.midDestroy = function(){
	//console.log('dispatched');
	this.loadTexture('buildings',this.srcMid);
}
