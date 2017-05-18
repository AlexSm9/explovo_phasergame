// Fire Hydrant
var Hydrant = function(game,x,y,player){
	this.player = player;
	Phaser.Sprite.call(this,game,x,y,'hydrant');
	game.physics.enable(this,Phaser.Physics.ARCADE);
	this.body.immovable = true;
	this.body.moves = false;
	this.anchor.set(0.5,0.5);
	this.body.setCircle(10);
	this.game.add.existing(this);
};

Hydrant.prototype = Object.create(Phaser.Sprite.prototype);
Hydrant.prototype.constructor = Hydrant;

Hydrant.prototype.update = function(){
	this.game.physics.arcade.collide(this,this.player);
	
	if (this.game.math.distance(this.x, this.y, this.player.x, this.player.y) < 50){
		this.player.waterUp();
	}
};