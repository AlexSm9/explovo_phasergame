// -- Generic Fire
// Accepts game, x and y position, and specific angle of creation
// 0, 90, 180, 270
var Fire = function(game, x, y, angle){
	
	// Creation Code
	this.sprite = Phaser.Sprite.call(this, game, x, y, 'fires'); // call sprite
	this.animations.add('fires'); // using the entire atlas
	this.animations.play('fires',15,true); // play at 15 fps with looping
	game.physics.enable(this, Phaser.Physics.ARCADE); // enable physics
	this.angle = angle; // set angle to provided angle
	this.body.immovable = true;

	// Angle for specific cases
	switch(angle){
		case 0:
			this.anchor.setTo(0,1); // anchor to bottom left
			this.body.setSize(this.width,this.height/2,0,this.height/2);
			break;
		case 90:
			this.anchor.setTo(0,1); // anchor to bottom left
			this.body.setSize(this.width/2,this.height,0,this.height);
			break;
		case 180:
			this.anchor.setTo(1,1); // anchor to bottom right
			this.body.setSize(this.width,this.height/2,this.width,this.height);
			break;
		case 270:
			this.anchor.setTo(1,1); // anchor to bottom right
			this.body.setSize(this.width/2,this.height,this.width/2,this.height);
			break;
	}
	// Adjust the size of the fire
	// Bounding box will be adjusted along with size
	this.width = 40; // adjusting size of fires
	this.height = 48;
	this.game.add.existing(this);
	
	// Parameters
	this.health = 200; // default hp set
    
    // add sounds
	this.sizzle = game.add.audio('fireSizzle');
    this.fire_sound = game.add.audio('fire');
    this.fire_sound.allowMultiple = true;
    
    this.fire_sound.play('', 0, .07, true);
};
	
Fire.prototype = Object.create(Phaser.Sprite.prototype);
Fire.prototype.constructor = Fire; // creation call

Fire.prototype.damage = function(){
	this.sizzle.play('', 0, 1, false, false);
	this.health -= 1;
	if (this.health < 0){
        //this.fire_sound.stop();
		this.kill();
	}
};