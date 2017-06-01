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
		this.game.world.setBounds(0,0,3200,2432); // initialize world bounds
        this.game.stage.backgroundColor = "#228B22";
		//this.game.add.tileSprite(0,0,1200,912,'bg');
		this.map = this.game.add.tilemap('CityTilemap');
        this.map.addTilesetImage('CityTileset64', 'CityTileset64');
        this.backgroundLayer = this.map.createLayer('Background');
        this.groundLayer = this.map.createLayer('ForeGround');

      // Create a new Player
      this.player = new Player(this.game,this.game.world.centerX, this.game.world.centerY, 'Player');
     this.game.camera.follow(this.player,4,0.1,0.1);  // set camera to player
	  
	  // Attach hose to player object
      this.emitter = new WaterHose(this.game, this.player, 25,15);
      this.world.moveDown(this.emitter);

   // Create new buildings
   // manual creation for this test
   this.buildingGroup = this.game.add.group(); // generate building group
   this.building = new Building(this.game,17,10,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
	this.buildingGroup.add(this.building);
   
   this.building = new Building(this.game,737,10,200,this.game.rnd.integerInRange(1,5),'building5', 'buildingDestroyed5');
   this.buildingGroup.add(this.building);
   
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(509+(417*i)),10,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(2823+(200*i)),25,200,this.game.rnd.integerInRange(1,5),'building5', 'buildingDestroyed5');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(1405+(255*i)),10,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(2000+(325*i)),10,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
		this.buildingGroup.add(this.building);
	}
	
	this.building = new Building(this.game,2420,720,200,this.game.rnd.integerInRange(1,5),'building6', 'buildingDestroyed6');
	this.buildingGroup.add(this.building);
	
	this.building = new Building(this.game,1450,1300,200,this.game.rnd.integerInRange(1,5),'fireStation', 'fireStationDestroyed');
	this.buildingGroup.add(this.building);
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,1800 + i*100,(1350),200, this.game.rnd.integerInRange(1,5),'fTruck', 'fTruckDestroyed');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 3; i++){
		this.building = new Building(this.game,(835),(645 + i*260),200,this.game.rnd.integerInRange(1,5),'building2', 'buildingDestroyed2');
		this.buildingGroup.add(this.building);
	}
	
	this.building = new Building(this.game,525,645,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
	this.buildingGroup.add(this.building);
	
	this.building = new Building(this.game,525,1100,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
	this.buildingGroup.add(this.building);
	
	this.building = new Building(this.game,530,1475,200,this.game.rnd.integerInRange(1,5),'building3', 'buildingDestroyed3');
	this.buildingGroup.add(this.building);
	
	this.building = new Building(this.game,0,665,200,this.game.rnd.integerInRange(1,5),'building4', 'buildingDestroyed4');
	this.buildingGroup.add(this.building);
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(510 + i*250),(2110),200,this.game.rnd.integerInRange(1,5),'building4', 'buildingDestroyed4');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(2300 + i*450),(2110),200,this.game.rnd.integerInRange(1,5),'building4', 'buildingDestroyed4');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(2560 + i*450),(2130),200,this.game.rnd.integerInRange(1,5),'building5', 'buildingDestroyed5');
		this.buildingGroup.add(this.building);
	}
	
	this.building = new Building(this.game,21,2110,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
	this.buildingGroup.add(this.building);
   
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(1280+(225*i)),2110,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
		this.buildingGroup.add(this.building);
	}
	
	this.building = new Building(this.game,1735,2185,200,this.game.rnd.integerInRange(1,5),'building2', 'buildingDestroyed2');
	this.buildingGroup.add(this.building);
	
	for(var i = 0; i < 3; i++){
		this.building = new Building(this.game,(-65),(1085 + i*260),200,this.game.rnd.integerInRange(1,5),'building2', 'buildingDestroyed2');
		this.buildingGroup.add(this.building);
	}
	
	//this.hydrant1 = new Hydrant(this.game,300,1000,this.player);
   
   this.pointer = this.game.add.sprite(0, 0, 'Particle');
   this.pointer.anchor.set(0.5,0.5);
   
	//create rioters and add to MobManager
   for(i=0; i<19; i++){
      rioter = new Rioter(this.game, {key: "rioter", frame: 0}, this.game.rnd.integerInRange(0, this.game.width), this.game.rnd.integerInRange(0, this.game.height));
      MM.addMob(rioter);
      this.game.add.existing(rioter);
   }
   MM.positionAllOffscreenRandomly(this.game);

   MM.setAllGoal(this.building.centerX, this.building.centerY, 0.4);
   
   building2 = this.building;
   console.log("BUILDING LOC: ", building2.x, building2.y);

game = this.game; //temp solution until I can figure out a better way to refernce game
   var throwAtBuilding2 = function(mob){
      //mob.freeze();
      mob.fireAtBuilding(game, building2);
      mob.setGoalPoint(game.world.centerX, game.world.centerY, 0.5);
	  console.log("FIRED: ", building2.x, building2.y);
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
	
	// Damage Fire Function
	hitBuilding = function(particle,building){
		particle.kill();
	}
   },//end_create
   update: function(){
	if (this.game.input.keyboard.isDown(Phaser.Keyboard.G)){
		this.state.start("stGameOver");
	}
	   
   // start UI update functions
    MM.update(this.game);
	this.waterUI.update();
	this.fireUI.update();
	
	// collisions
	this.game.physics.arcade.collide(this.emitter, this.buildingGroup,hitBuilding);
	this.game.physics.arcade.collide(this.player, this.buildingGroup);

	// Fires
	this.buildingGroup.forEach(function(building){
		this.game.physics.arcade.overlap(this.emitter,building.fireGroup,building.damageFire); // emitter with fire
	},this);
	
	//cursor
	this.pointer.x = this.game.camera.x + this.game.input.x -0;
	this.pointer.y = this.game.camera.y + this.game.input.y -0;
	
	//console.log(this.game.camera.x + this.game.input.x, this.game.camera.y + this.game.input.y);
   },//end_update
   //render: function() {
   // display fps
    //  this.game.debug.text('FPS: ' + this.game.time.fps, 20, 580, 'yellow');
	//this.game.debug.body(this.building);
   //}
};//end_s1Game
