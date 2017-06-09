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
		this.game.world.setBounds(0,0,4320,2918.4); // initialize world bounds
        this.game.stage.backgroundColor = "#228B22";
		//this.game.add.tileSprite(0,0,1200,912,'bg');
		this.map = this.game.add.tilemap('CityTilemap');
        this.map.addTilesetImage('CityTileset64', 'CityTileset64');
        this.backgroundLayer = this.map.createLayer('Background');
        this.groundLayer = this.map.createLayer('ForeGround');
		
		this.groundLayer.width =1800;
		this.groundLayer.height =1216;
		this.groundLayer.resizeWorld();

		// leave this here for layering purposes
		// Phaser layers based on instantiation order
		// creating this group here and adding hydrants to it will guarantee the player is above it
		this.hydrantGroup = this.game.add.group(); // generate hydrant group
	

      // Create a new Player
   	  this.player = new Player(this.game,this.game.world.centerX, this.game.world.centerY, 'assets' , 'firefighter');
	  this.game.camera.focusOnXY(this.player.x,this.player.y);
      this.game.camera.follow(this.player,4,0.1,0.1);  // set camera to player

	  // Attach hose to player object
      this.emitter = new WaterHose(this.game, this.player, 30, 15);
      this.world.moveDown(this.emitter); // emitter below player

   // Create new buildings
   // manual creation for this test
   this.buildingGroup = this.game.add.group(); // generate building group
   this.building = new Building(this.game,131,191,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
	this.buildingGroup.add(this.building);
   
   this.building = new Building(this.game,830,156,200,this.game.rnd.integerInRange(1,5),'building5', 'buildingDestroyed5');
   this.buildingGroup.add(this.building);
   
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(621+(417*i)),191,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(2912+(200*i)),173,200,this.game.rnd.integerInRange(1,5),'building5', 'buildingDestroyed5');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(1518+(255*i)),191,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(2113+(325*i)),191,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
		this.buildingGroup.add(this.building);
	}
	
	this.building = new Building(this.game,2671,1231,200,this.game.rnd.integerInRange(1,5),'building6', 'buildingDestroyed6');
	this.buildingGroup.add(this.building);
	
	this.building = new Building(this.game,1622,1544,200,this.game.rnd.integerInRange(1,5),'fireStation', 'fireStationDestroyed');
	this.buildingGroup.add(this.building);
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,1834 + i*100,(1441),200, this.game.rnd.integerInRange(1,5),'fTruck', 'fTruckDestroyed');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 3; i++){
		this.building = new Building(this.game,(988),(760 + i*260),200,this.game.rnd.integerInRange(1,5),'building2', 'buildingDestroyed2');
		this.buildingGroup.add(this.building);
	}
	
	this.building = new Building(this.game,637,826,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
	this.buildingGroup.add(this.building);
	
	this.building = new Building(this.game,637,1281,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
	this.buildingGroup.add(this.building);
	
	this.building = new Building(this.game,821,1662,200,this.game.rnd.integerInRange(1,5),'building3', 'buildingDestroyed3');
	this.buildingGroup.add(this.building);
	
	this.building = new Building(this.game,125,823,200,this.game.rnd.integerInRange(1,5),'building4', 'buildingDestroyed4');
	this.buildingGroup.add(this.building);
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(635 + i*250),(2261),200,this.game.rnd.integerInRange(1,5),'building4', 'buildingDestroyed4');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(2424 + i*450),(2272),200,this.game.rnd.integerInRange(1,5),'building4', 'buildingDestroyed4');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(2650 + i*450),(2277),200,this.game.rnd.integerInRange(1,5),'building5', 'buildingDestroyed5');
		this.buildingGroup.add(this.building);
	}
	
	this.building = new Building(this.game,135,2290,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
	this.buildingGroup.add(this.building);
   
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(1393+(225*i)),2289,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
		this.buildingGroup.add(this.building);
	}
	
	this.building = new Building(this.game,1890,2300,200,this.game.rnd.integerInRange(1,5),'building2', 'buildingDestroyed2');
	this.buildingGroup.add(this.building);
	
	for(var i = 0; i < 3; i++){
		this.building = new Building(this.game,(93),(1201 + i*260),200,this.game.rnd.integerInRange(1,5),'building2', 'buildingDestroyed2');
		this.buildingGroup.add(this.building);
	}
	
	//Hydrants
	for(var i = 0; i < 8; i++){
		this.hydrant = new Hydrant(this.game,125 + i*495,435,this.player);
		this.hydrantGroup.add(this.hydrant);}
	for(var i = 0; i < 2; i++){
		this.hydrant = new Hydrant(this.game,2613 + i*149,200,this.player);
		this.hydrantGroup.add(this.hydrant);}
	for(var i = 0; i < 2; i++){
		this.hydrant = new Hydrant(this.game,1205 + i*149,200,this.player);
		this.hydrantGroup.add(this.hydrant);}
	for(var i = 0; i < 2; i++){
		this.hydrant = new Hydrant(this.game,310 + i*149,200,this.player);
		this.hydrantGroup.add(this.hydrant);}
	this.hydrant = new Hydrant(this.game,1137,896,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,1137,1491,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,1137,1845,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,1415,650,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,2033,650,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,2033,1304,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,1415,1304,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,526,1473,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,526,1840,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,126,1910,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,126,2057,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,310,2290,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,455,2290,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,768,2058,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,1078,2290,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,1225,2290,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,1420,1845,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,1568,2059,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,2100,2290,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,2250,2290,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,2786,586,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,2315,1447,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,2496,2057,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,3007,2057,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,2688,1911,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,311,1015,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,312,1600,this.player);
	this.hydrantGroup.add(this.hydrant);

   this.G = this.game.input.keyboard.addKey(Phaser.Keyboard.G);

   // add and play music
   this.bg_music = this.game.add.audio('game_music');
   this.bg_music.play('', 0, 1, true);

   //create rioters and add to MobManager
   for(i=0; i<19; i++){
      rioter = new Rioter(this.game, {key: 'assets', frame: 'rioter'}, this.game.rnd.integerInRange(0, this.game.width), this.game.rnd.integerInRange(0, this.game.height));
      MM.addMob(rioter);
      this.game.add.existing(rioter);
   }
   
   building2 = this.buildingGroup.getRandom();
   MM.positionAllOffscreenRandomly(this.game);
   MM.setAllGoal(this.building.centerX, this.building.centerY, 0.4);
   console.log("BUILDING LOC: ", building2.x, building2.y);

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
   this.pointer = this.game.add.sprite(0, 0, 'assets','crosshair');
   this.pointer.anchor.set(0.5,0.5);
   this.waterUI = new WaterUI(this.game,this.player,70,60);
   this.fireUI = new FireUI(this.game,this.buildingGroup,765,355);
     
     this.end = damageFire = function(particle,building){
      particle.kill();
      building.damageFire();
   }

   },//end_create

   update: function(){

   if (this.G.isDown){
      this.state.start("stGameOver");

 
   }


  //console.log(rToA(this.game.physics.arcade.angleBetweenCenters(this.player,this.building2)));
   // start UI update functions
   MM.update(this.game);
	this.waterUI.update();
	this.fireUI.update();

	// - Collisions -
	// Buildings
	this.game.physics.arcade.collide(this.emitter, this.buildingGroup,this.emitter.buildingCollision); // emitter with buildings
	this.game.physics.arcade.collide(this.player, this.buildingGroup); // player with buildings

	// Fires
	this.buildingGroup.forEach(function(building){
		this.game.physics.arcade.overlap(this.emitter,building.fireGroup,building.damageFire); // emitter with fire
	},this);
	
	//cursor
	this.pointer.x = this.game.camera.x + this.game.input.x -0;
	this.pointer.y = this.game.camera.y + this.game.input.y -0;

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
