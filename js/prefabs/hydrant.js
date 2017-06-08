// Fire Hydrant
var Hydrant = function(game,x,y,player){
	this.game = game;
	this.player = player;
	Phaser.Sprite.call(this,game,x,y,'assets','FireHydrant1');
	game.physics.enable(this,Phaser.Physics.ARCADE);
	this.body.immovable = true;
	this.body.moves = false;
	this.anchor.set(0.5,0.5);
	this.body.setSize(25,25,25,15);// square hitbox is a bit better
	//this.body.setCircle(10);
	this.game.add.existing(this);

    // add in audio
    this.refill_start = game.add.audio('refill_start');
    this.refill = game.add.audio('refill');
    this.refill_done = game.add.audio('refill_done');
    this.refill_notdone = game.add.audio('refill_notdone');
};

Hydrant.prototype = Object.create(Phaser.Sprite.prototype);
Hydrant.prototype.constructor = Hydrant;

Hydrant.prototype.update = function(){
	this.game.physics.arcade.collide(this,this.player);
	
	if (this.game.math.distance(this.x, this.y, this.player.x, this.player.y) < 75){
		this.player.waterUp();

        // play refill sound if player stands near hydrant with less than max water Level
        if (!this.refill.isPlaying && this.player.waterLevel < 100) {
            this.refill_start.play('', 0, .75, false);
            this.refill.play('', 0, 1, true);
        } else if (this.player.waterLevel >= 100 && this.refill.isPlaying) { //stop refill sound and play refill done sound once water level max
            this.refill.stop();
            this.refill_done.play('', 0, .75, false);
        }

	} else if (this.refill.isPlaying) { //stop refill sound if player walks away from hydrant, and play refill not done sound
        this.refill.stop();
        this.refill_notdone.play('', 0, .75, false);
    }

if(this.waterLevel>50){
		l("U need watter");
			this.waterarrow = new WaterArrow(this.game,x,y-40,this.player);
	}
};

Hydrant.prototype.Indicator = function(){
	if (this.waterLevel < 50){
		l("U need watter");
			this.waterarrow = new WaterArrow(this.game,x,y-40,this.player);
	}
	if(this.waterLevel>50){
		this.waterarrow.kill();
	}
};