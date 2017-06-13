// -- Player
// Constructor
// Inputs: Game,x,y,key, image
// needs to be modified later to accept atlas and animation
var Player = function(game, x, y, key, src) {
	// initialize variable
	Phaser.Sprite.call(this, game, x, y, key, src); // call sprite
	this.game.physics.enable(this, Phaser.Physics.ARCADE); // enable physics
	this.anchor.set(0.5,0.5); // set anchor to center
	this.body.setSize(25,25,25,25); // set to a small square
	//this.body.setCircle(25); // circular hitbox, kinda sucks actually
	this.waterLevel = 100;
	this.waterLevelTotal = 100;

	// set parameters
	this.game = game;
	this.body.collideWorldBounds = true;
	this.body.drag.set(100); // drag property
	this.body.maxVelocity.set(200); // max velocity

	// create WASD keys
	this.w = game.input.keyboard.addKey(Phaser.Keyboard.W);
	this.a = game.input.keyboard.addKey(Phaser.Keyboard.A);
	this.s = game.input.keyboard.addKey(Phaser.Keyboard.S);
	this.d = game.input.keyboard.addKey(Phaser.Keyboard.D);
	this.game.input.keyboard.addKeyCapture(this.w);
	this.game.input.keyboard.addKeyCapture(this.a);
	this.game.input.keyboard.addKeyCapture(this.s);
	this.game.input.keyboard.addKeyCapture(this.d);

	// add this object to the game
	this.game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player; // creation call

Player.prototype.update = function() {
	// angle towards mouse
	if(!this.frozen){
		this.rotation = this.game.physics.arcade.angleToPointer(this);
	}
	// Y Axis Movement
	// up
	if (this.w.isDown){
		this.body.velocity.y -= 50;
	} // down
	else if (this.s.isDown){
		this.body.velocity.y += 50;
	}
	else{
		this.body.velocity.y = 0;
	}
	// X Axis Movement
	// left
	if (this.a.isDown){
		this.body.velocity.x -= 50;
	} // right
	else if (this.d.isDown){
		this.body.velocity.x += 50;
	} // stationary
	else{
		this.body.velocity.x = 0;
	}
};

Player.prototype.waterUp = function(){
	if (this.waterLevel < 100){
		this.waterLevel += 0.5;
    }
};

Player.prototype.freeze = function(boolean){
   this.body.maxVelocity.set(0);
   this.frozen = true;
   if(boolean === false){
      this.body.maxVelocity.set(200);
	  this.frozen = false;
   }
};
