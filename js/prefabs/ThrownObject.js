// -- ThrownObject
var ThrownObject = function(game, spriteObject, positionX, positionY, isTutorial) {
	// initialize variable
   Phaser.Sprite.call(this, game, positionX, positionY, spriteObject.key, spriteObject.frame);
	this.anchor.set(0.5,0.5); // set anchor to center
	game.physics.enable(this);

	// add this object to the game
	this.game.add.existing(this);

   // Quickfix for world ordering
   game.world.sendToBack(this);
   for(var q=0; q<4; q++){
      game.world.moveUp(this);
   }

	this.collideWithBuildingEnable = false;
	this.inProgress = false;
	this.building = null;
	this.maxVelocity = 4;

    // add audio
    this.molotov = game.add.audio('molotov');
    this.molotov.allowMultiple = true; //so you can hear all the molotovs shatter yay

   this.isTutorial = typeof isTutorial !== 'undefined' ? isTutorial : false;

};

ThrownObject.prototype = Object.create(Phaser.Sprite.prototype);
ThrownObject.prototype.constructor = ThrownObject;

ThrownObject.prototype.update = function() {

	//enable rotation
	this.rotation += 0.1;

	if(this.collideWithBuildingEnable === true){
      if(this.isTutorial){
   		if(this.game.physics.arcade.collide(this, this.building)){
               // play molotov explosion sound
               if (!this.molotov.isPlaying) {
                   this.molotov.play('', 0, 0.75, false);
               }
   			this.building.startFire(this.game.physics.arcade.angleBetweenCenters(this,this.building),this.x,this.y);
   			this.destroy();
   		}
      }else{
         if(this.game.physics.arcade.overlap(this, this.building)){
               // play molotov explosion sound
               if (!this.molotov.isPlaying) {
                   this.molotov.play('', 0, 0.75, false);
               }
            this.building.startFire(this.game.physics.arcade.angleBetweenCenters(this,this.building),this.x,this.y);
            this.destroy();
         }
      }
	}
};

ThrownObject.prototype.throwAtBuilding = function(building, velocity){
	this.building = building;
	this.collideWithBuildingEnable = true;
	var dX = building.centerX-this.x;
	var dY = building.centerY-this.y;
	if(this.inProgress === false){
		this.inProgress = true;
	}
	var n = normalize(dX, dY);
	this.body.velocity.x = this.maxVelocity*n.x*velocity;
	this.body.velocity.y = this.maxVelocity*n.y*velocity;
};
