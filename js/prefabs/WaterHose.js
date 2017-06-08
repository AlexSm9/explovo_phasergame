// WaterHose
// Creates and attaches an emitter that generates water particles
// Extends Phaser.Emitter and takes 
var ArrowOn=false;

var WaterHose = function(game,attachments,x,y){
	console.log('create hose');
// Create emitter
	Phaser.Particles.Arcade.Emitter.call(this, game, x, y); // create emitter
	this.game.physics.enable(this, Phaser.Physics.ARCADE); // enable physics

	// Initialize variables
    this.waterStreamMaxDistance = 250; // Max distance of water
    this.particleVelocityOffsetMax = 200; // distance of player to mouse cursor
    this.particleVelocityOffsetMin = 80;
    this.particleVelocityOffsetNarrowing = 0.5; // particle narrowing
    this.particleVelocityOffsetNoise = 10; // adds variation to water particles

	// Attachment variables
    this.emitterSpriteOffsetX = x; // offset from the sprite
    this.emitterSpriteOffsetY = y;
	this.attachment = attachments;
	this.waterParticleLifetimeConstant = 4; // lifetime of the particle from creation

	// Declaring some variables
    this.particleVelocityOffset;
    this.distMouseCursorToEmitter;
    this.onEmit = new Phaser.Signal();

	// Create particles
	this.makeParticles('water',0,250,true,false);
	this.forEach(function(particle){
		particle.enableBody = true;
		particle.body.allowGravity = false;
	}, this);
    
    // add in audio
    this.water_spray = game.add.audio('water_spray');
    this.water_end = game.add.audio('water_end');
    this.water_out1 = game.add.audio('water_out1');
    this.water_out2 = game.add.audio('water_out2');
    
    // add listeners for mouse down, and mouse up
    this.game.input.onDown.add(this.playSound, this);
    this.game.input.onUp.add(this.stopSound, this);
};

// Update the prototype
WaterHose.prototype = Object.create(Phaser.Particles.Arcade.Emitter.prototype);
WaterHose.prototype.constructor = WaterHose; // creation call

WaterHose.prototype.create = function() {

};

// Override Update Function
WaterHose.prototype.update = function() {
	if (this.game.input.mousePointer.isDown){
        this.y = this.attachment.y + transformOverAngle(this.attachment.rotation, this.emitterSpriteOffsetX, this.emitterSpriteOffsetY).y;
		this.x = this.attachment.x + transformOverAngle(this.attachment.rotation, this.emitterSpriteOffsetX, this.emitterSpriteOffsetY).x;

		var adjustedMouseX = this.game.input.mousePointer.x + this.game.camera.x;
		var adjustedMouseY = this.game.input.mousePointer.y + this.game.camera.y;
		
		this.distMouseCursorToEmitter = distanceBetween(adjustedMouseX, adjustedMouseY, this.x, this.y);

		// handles the "spread" of water particles (the further you aim the narrower the stream)
		this.particleVelocityOffset = this.distMouseCursorToEmitter ;
		if (this.particleVelocityOffset > this.particleVelocityOffsetMax){
			this.particleVelocityOffset = this.particleVelocityOffsetMax;
		}else if(this.particleVelocityOffset < this.particleVelocityOffsetMin){
			this.particleVelocityOffset = this.particleVelocityOffsetMin;
		}
		this.particleVelocityOffset = this.particleVelocityOffsetNarrowing*(this.particleVelocityOffsetMax-this.particleVelocityOffset) + this.particleVelocityOffsetNoise;
	// whatever the hell this is
		this.lifespan = this.waterStreamMaxDistance*this.waterParticleLifetimeConstant;

		if(this.distMouseCursorToEmitter > this.waterStreamMaxDistance){
			var similarTriangleProportion = this.waterStreamMaxDistance/this.distMouseCursorToEmitter;
			this.emitterToMouseDistanceX = similarTriangleProportion*(adjustedMouseX-this.x);
			this.emitterToMouseDistanceY = similarTriangleProportion*(adjustedMouseY-this.y);
		}else{
			this.emitterToMouseDistanceX = adjustedMouseX-this.x;
			this.emitterToMouseDistanceY = adjustedMouseY-this.y;
		}

		this.maxParticleSpeed = new Phaser.Point(this.emitterToMouseDistanceX+this.particleVelocityOffset, this.emitterToMouseDistanceY+this.particleVelocityOffset);
		this.minParticleSpeed = new Phaser.Point(this.emitterToMouseDistanceX-this.particleVelocityOffset, this.emitterToMouseDistanceY-this.particleVelocityOffset);

		// emit particles until out of water
		if(this.attachment.waterLevel > 0) {
			this.emitParticle();
			this.attachment.waterLevel -= 0.2; // water flow rate, needs changing soon
			
		/*	if(this.attachment.waterLevel<50){
				this.ArrowOn=true;
				l("U need watter");
				this.waterarrow = new WaterArrow(this.game,615,100,this.player);
			}else{
				this.ArrowOn=false;
			}
			if(this.ArrowOn=false){
				this.waterarrow.kill
			}

			//	 }else{
			//	 	this.waterarrow.kill();
			//	 }*/
			
   }
    }
    // stop water spray sound and play water end sound when waterLevel is 0
    if (this.attachment.waterLevel <= 0 && this.water_spray.isPlaying) {
        this.water_spray.stop();
        this.water_out1.play('', 0, 0.75, false);
    }
    // start playing water spray sound if refilling from 0 and mouse button was held down
    if (this.attachment.waterLevel > 0 && this.attachment.waterLevel < .3 && !this.water_spray.isPlaying && this.game.input.mousePointer.isDown) {
        this.water_spray.play('', 0, 0.75, true);
    }
};

// Sound functions
WaterHose.prototype.playSound = function() {
    // Play spray sound on mouse press
    if (this.attachment.waterLevel > 0) {
        this.water_spray.play('', 0, 0.75, true);
    } else {
        this.water_out1.play('', 0, 0.75, false);
    }
};

WaterHose.prototype.stopSound = function() {
    // Stop spray sound, play spray release sound on mouse release
    this.water_spray.stop();
    if (this.game.input.activePointer.withinGame) {
        if (this.attachment.waterLevel > 0) {
            this.water_end.play('', 0, .75, false);
        } else {
            this.water_out2.play('', 0, 0.50, false);
        }
    }
};

// Collision function
// Creates 'foam' over the collision target
WaterHose.prototype.buildingCollision = function(particle,building){
    // Generate a new emitter
    var foamEmitter = building.game.add.emitter(particle.x,particle.y,3);
    foamEmitter.makeParticles('foam'); // create foam particle
    foamEmitter.forEach(function(particle){ // disable gravity for each
        particle.body.allowGravity = false;
    },this);
    foamEmitter.setXSpeed(-15,15); // adjust the distance they 'burst' out
    foamEmitter.setYSpeed(-15,15);
    foamEmitter.start(true,500,null,3); // explode
    particle.kill(); // destroy water particle
}