//Main this.game State
var stGame = function(game) {

   //Rioter_
   var MM;
   var MM2;
   //_Rioter
};
stGame.prototype = {
   preload: function(){
      this.game.time.advancedTiming = true;
      //Rioter_
      MM = new MobManager(100, 50, 100, 1, 1.5, 1);
      //_Rioter
   },//end_preload
   create: function() {
   //--/ variable assignments
	console.log('game bg');
      //--/ tilemap variable
		this.game.world.setBounds(0,0,1200,912); // initialize world bounds
        this.game.stage.backgroundColor = "#228B22";
		this.game.add.tileSprite(0,0,1200,912,'bg');
      /*  this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('asd', 'TileAtlas');
        this.backgroundlayer = this.map.createLayer('BackgroundLayer');
        this.groundLayer = this.map.createLayer('GroundLayer');*/

      // Create a new Player
      this.player = new Player(this.game,this.game.world.centerX, this.game.world.centerY, 'Player');
     this.game.camera.follow(this.player,4,0.1,0.1);  // set camera to player

	  // Attach hose to player object
      this.emitter = new WaterHose(this.game, this.player, 30,15);
      this.world.moveDown(this.emitter);

   // Create new buildings
   // manual creation for this test
   this.buildingGroup = this.game.add.group(); // generate building group
   //this.buildingGroup.scale.setTo(0.8,0.8);
   //this.building1 = new Building(this.game,400,400,200,1,'building');
   //this.buildingGroup.add(this.building1);

   this.building2 = new Building(this.game,1000,676,300,0,'Test_Building1');
   this.buildingGroup.add(this.building2);
   //this.hydrant1 = new Hydrant(this.game,300,1000,this.player);

   this.building3 = new Building(this.game,165,217,600,3,'Test_Building1');
   this.buildingGroup.add(this.building3);
  this.building4 = new Building(this.game,1000,107,600,4,'Test_Building1');
   this.buildingGroup.add(this.building4);

  // this.building5 = new Building(this.game,386,249,600,5,'Test_Building1');
  // this.buildingGroup.add(this.building5);
   //this.building6 = new Building(this.game,418,591,600,6,'Test_Building1');
   //this.buildingGroup.add(this.building6);

   this.hydrantGroup = this.game.add.group(); // generate building group

   this.hydrant2 = new Hydrant(this.game,830,700,this.player);
   this.hydrantGroup.add(this.hydrant2);
   this.hydrant3 = new Hydrant(this.game,615,100,this.player);
   this.hydrantGroup.add(this.hydrant3);

   this.G = this.game.input.keyboard.addKey(Phaser.Keyboard.G);




   //create rioters and add to MobManager
   for(i=0; i<19; i++){
      rioter = new Rioter(this.game, {key: "rioter", frame: 0}, this.game.rnd.integerInRange(0, this.game.width), this.game.rnd.integerInRange(0, this.game.height));
      MM.addMob(rioter);
      this.game.add.existing(rioter);
   }
   MM.positionAllOffscreenRandomly(this.game);

   MM.setAllGoal(this.building2.centerX, this.building2.centerY, 0.4);


building2 = this.building2;

game = this.game; //temp solution until I can figure out a better way to refernce game
   var throwAtBuilding2 = function(mob){
      //mob.freeze();
      mob.fireAtBuilding(game, building2);
      mob.setGoalPoint(game.world.centerX, game.world.centerY, 0.5);
      //tObject = new ThrownObject(game, {key: "moltav", frame: 0}, mob.centerX, mob.centerY);
   };

   var onSprayIncreaseGoalweight = function(mob){
      //mob.freeze();
      mob.setGoalPoint(mob.primaryGoalX, mob.primaryGoalY, (mob.goalVectorWeight + 0.02));
      //tObject = new ThrownObject(game, {key: "moltav", frame: 0}, mob.centerX, mob.centerY);
   };

   MM.addAllTriggerOnEntry(building2.x-(building2.width/2)-60, building2.y - (building2.height/2)- 60, building2.width+120, building2.height + 120, throwAtBuilding2);
   //This is for top left corner handle --> MM.addAllTriggerOnEntry(building2.x-60, building2.y - 60, building2.width+120, building2.height + 120, throwAtBuilding2);
   // The less movable an object is, the further down the list it should be
   MM.addAllTriggerOnCollision(this.emitter, onSprayIncreaseGoalweight, false);
   MM.addAllTriggerOnCollision(this.player);
   MM.addAllTriggerOnCollision(this.hydrantGroup, null, false);
   MM.addAllTriggerOnCollision(this.buildingGroup, null, false);


   // Create UI
   this.waterUI = new WaterUI(this.game,this.player,70,60);
   this.fireUI = new FireUI(this.game,this.buildingGroup,765,355);

	// Kill particle function
	hitBuilding = function(particle,building){
		particle.kill();
	};



   },//end_create

   update: function(){

   if (this.G.isDown){
      this.state.start("stGameOver");
   }

   // start UI update functions
   MM.update(this.game);
	this.waterUI.update();
	this.fireUI.update();

	// - Collisions -
	// Buildings
	this.game.physics.arcade.collide(this.emitter, this.buildingGroup,hitBuilding); // emitter with buildings
	this.game.physics.arcade.collide(this.player, this.buildingGroup); // player with buildings

	// Fires
	this.buildingGroup.forEach(function(building){
		this.game.physics.arcade.overlap(this.emitter,building.fireGroup,building.damageFire); // emitter with fire
	},this);

   },//end_update

 /*  render: function() {
	   this.buildingGroup.forEach(function(building){
		   building.fireGroup.forEach(function(fire){
			   this.game.debug.body(fire);
		   },this);
	   },this);
   // display fps
    //  this.game.debug.text('FPS: ' + this.game.time.fps, 20, 580, 'yellow');
   }*/
};//end_s1Game
