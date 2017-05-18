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
		this.game.world.setBounds(0,0,1600,1200); // initialize world bounds
        this.game.stage.backgroundColor = "#228B22";
      /*  this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('asd', 'TileAtlas');
        this.backgroundlayer = this.map.createLayer('BackgroundLayer');
        this.groundLayer = this.map.createLayer('GroundLayer');*/

      // Create a new Player
      this.player = new Player(this.game,this.game.world.centerX, this.game.world.centerY, 'Player');
     this.game.camera.follow(this.player,4,0.1,0.1);  // set camera to player
	  
	  // Attach hose to player object
      this.emitter = new WaterHose(this.game, this.player, 25,15);
      this.world.moveDown(this.emitter);


   // Create new buildings
   // manual creation for this test
   this.buildingGroup = this.game.add.group(); // generate building group
   this.building1 = new Building(this.game,400,400,200,1,'building');
   this.buildingGroup.add(this.building1);
   this.building2 = new Building(this.game,400,800,300,2,'building');
   this.buildingGroup.add(this.building2); 
   this.hydrant1 = new Hydrant(this.game,200,1000,this.player);
   
   this.building3 = new Building(this.game,1000,500,200,3,'building');
   this.buildingGroup.add(this.building3);
   this.building4 = new Building(this.game,1000,1000,300,4,'building');
   this.buildingGroup.add(this.building4);
   this.hydrant2 = new Hydrant(this.game,750,700,this.player);
   
   this.building5 = new Building(this.game,1300,500,200,5,'building');
   this.buildingGroup.add(this.building5); 
   this.building6 = new Building(this.game,30,500,300,6,'building');
   this.buildingGroup.add(this.building6);
   this.hydrant3 = new Hydrant(this.game,500,700,this.player);
   
   
      // Create UI
	this.waterUI = new WaterUI(this.game,this.player,70,60);
	this.fireUI = new FireUI(this.game,this.buildingGroup,765,355);
	
	// Damage Fire Function
	damageFire = function(particle,building){
		particle.kill();
		building.damageFire();
	}
	
   },//end_create
   update: function(){

   // start UI update functions
	this.waterUI.update();
	this.fireUI.update();
	
	// collisions
	this.game.physics.arcade.collide(this.emitter, this.buildingGroup,damageFire);
	this.game.physics.arcade.collide(this.player, this.buildingGroup);

   },//end_update
   render: function() {
   // display fps
    //  this.game.debug.text('FPS: ' + this.game.time.fps, 20, 580, 'yellow');
   }
};//end_s1Game
