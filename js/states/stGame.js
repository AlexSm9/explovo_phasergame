//Main this.game State
var stGame = function(game) {
};
stGame.prototype = {
   preload: function(){
      this.game.time.advancedTiming = true;
   },//end_preload
   create: function() {
   //--/ variable assignments
	console.log('game bg');
      //--/ tilemap variable
         this.game.stage.backgroundColor = "#facade";
         this.map = this.game.add.tilemap('tilemap');
         this.map.addTilesetImage('asd', 'TileAtlas');
         this.backgroundlayer = this.map.createLayer('BackgroundLayer');
         this.groundLayer = this.map.createLayer('GroundLayer');

      // Create a new Player
      this.player = new Player(this.game,this.game.world.centerX, this.game.world.centerY, 'Player');
      
	  // Attach hose to player object
      this.emitter = new WaterHose(this.game, this.player, 25,15);
      this.world.moveDown(this.emitter);

   // Create UI
	this.waterUI = new WaterUI(this.game,this.player,70,60);
	this.fireUI = new FireUI(this.game,100,765,355);
   
      particleBuildingOnCollision = function(particle, building){ //for "not a function" errors, try swapping the arguments
         particle.kill();
      };

   },//end_create
   update: function(){

	this.waterUI.update();
   /*
   this.game.physics.arcade.collide(emitter, building, particleBuildingOnCollision);
   this.game.physics.arcade.collide(player, building);

   this.game.physics.arcade.collide(emitter, building2, particleBuildingOnCollision);
   this.game.physics.arcade.collide(player, building2);
   */

   },//end_update
   render: function() {
   // display fps
      this.game.debug.text('FPS: ' + this.game.time.fps, 20, 580, 'yellow');
   }
};//end_s1Game