// WaterArrows
var WaterArrow = function(game,x,y,player){

	this.player = player;
	Phaser.Sprite.call(this,game,x,y,'assets','Blank');
	//var Arrow =Phaser.Sprite.call(this,game,x,y-60,'waterArrow');
	game.physics.enable(this,Phaser.Physics.ARCADE);
	this.body.immovable = true;
	this.body.moves = false;
	this.anchor.set(0.5,0.5);
	this.body.setCircle(30);
	this.game.add.existing(this);

	this.waterArrows = 0;
	ArrowMovement=0;
	ArrowMax=10;
	ArrowMin=-10;

	game.time.events.repeat(Phaser.Timer.SECOND * 2, 100, this.killArrow, this);

	this.ArrowGroup = this.game.add.group();
	//this.game.add.existing(Arrow);
	//this.ArrowGroup.add(Arrow);


	this.makeArrow();

};

WaterArrow.prototype = Object.create(Phaser.Sprite.prototype);
WaterArrow.prototype.constructor = WaterArrow;

WaterArrow.prototype.update = function(){




	//this.game.physics.arcade.collide(this,this.player);

	//if (this.game.math.distance(this.x, this.y, this.player.x, this.player.y) < 50){
	//	this.player.waterUp();
	//}
};

WaterArrow.prototype.makeArrow = function(){
	//this.player = player;
	this.waterArrows =+1;
	var Arrow = this.game.add.sprite(this.x-30,this.y-60,'assets','WaterArrow');
	var Arrow2 = this.game.add.sprite(this.x-100,this.y-60,'assets','WaterArrow');
	var Arrow3 = this.game.add.sprite(this.x-300,this.y-60,'assets','WaterArrow');
	this.game.add.existing(Arrow);
	this.ArrowGroup.add(Arrow);
	this.ArrowGroup.add(Arrow2);
	this.ArrowGroup.add(Arrow3);
	//this.game.add.tween(Arrow).to({ y: 20 }, 20, Phaser.Easing.Quadratic.InOut, true, 0, 20, true);
}
WaterArrow.prototype.killArrow = function(){
	this.ArrowGroup.removeAll(true);
}
