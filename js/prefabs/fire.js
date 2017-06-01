// -- Generic Fire
var Fire = function(game, x, y, angle){
	
	// Creation Code
	Phaser.Sprite.call(this, game, x, y, 'fire'); // call sprite
	game.physics.enable(this, Phaser.Physics.ARCADE); // enable physics
	this.angle = angle;
	this.body.immovable = true;
	switch(angle){
		case 0:
			this.anchor.setTo(0,1); // anchor to bottom left
			this.body.setSize(this.width,this.height/2,0,this.height/2);
			break;
		case 90:
			this.anchor.setTo(0,1); // anchor to bottom left
			this.body.setSize(this.height/2,this.width,0,this.height);
			break;
		case 180:
			this.anchor.setTo(1,1); // anchor to bottom right
			this.body.setSize(this.width,this.height/2,this.width,this.height);
			break;
		case 270:
			this.anchor.setTo(1,1); // anchor to bottom right
			this.body.setSize(this.height/2,this.width,30,this.height);
			break;
	}
	this.game.add.existing(this);
	
	// Parameters
	this.health = 200; // default hp set
};
	
Fire.prototype = Object.create(Phaser.Sprite.prototype);
Fire.prototype.constructor = Fire; // creation call

Fire.prototype.damage = function(){
	this.health -= 1;
	if (this.health < 0){
		this.kill();
	}
};