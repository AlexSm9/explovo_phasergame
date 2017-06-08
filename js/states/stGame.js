//Main this.game State
var stGame = function(game) {
    //Rioter_
   //var MM;
   //var MM2;


   var RM;
   var buildingGroup;
   var hydrantGroup;
   var player;

   //_Rioter
};
stGame.prototype = {
   preload: function(){
      this.game.time.advancedTiming = true;
      //Rioter_
      //MM = new MobManager(100, 50, 100, 1, 1.5, 1);
      //_Rioter
      this.RM = new MobManager(100, 50, 100, 1, 1.5, 1);

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
   	  this.player = new Player(this.game,this.game.world.centerX, this.game.world.centerY, 'assets' , 'firefighter');
	  this.game.camera.focusOnXY(this.player.x,this.player.y);
      this.game.camera.follow(this.player,4,0.1,0.1);  // set camera to player

	  // Attach hose to player object
      this.emitter = new WaterHose(this.game, this.player, 30, 15);
      this.world.moveDown(this.emitter); // emitter below player



   // Create environment
	this.hydrantGroup = new stGameHydrantGroup(this.game,this.player); // Hydrants
	this.buildingGroup = new stGameBuildingGroup(this.game); // Buildings

   // Start music
   this.bg_music = this.game.add.audio('game_music');
   this.bg_music.play('', 0, 1, true);

   //create rioters and add to MobManager
/*
   for(i=0; i<19; i++){
      rioter = new Rioter(this.game, {key: 'assets', frame: 'rioter'}, this.game.rnd.integerInRange(0, this.game.width), this.game.rnd.integerInRange(0, this.game.height));
      MM.addMob(rioter);
      this.game.add.existing(rioter);
   }

   building2 = this.buildingGroup.getRandom();
   MM.positionAllOffscreenRandomly(this.game);
   MM.setAllGoal(building2.centerX, building2.centerY, 0.4);
   console.log("BUILDING LOC: ", building2.x, building2.y);


   // Create UI
   this.pointer = this.game.add.sprite(0, 0, 'assets','crosshair');
   this.pointer.anchor.set(0.5,0.5);
   this.waterUI = new WaterUI(this.game,this.player,70,60);
   this.fireUI = new FireUI(this.game,this.buildingGroup,765,355);

     this.end = damageFire = function(particle,building){
      particle.kill();
      building.damageFire();
   }
   // Debug Keys*/
	this.G = this.game.input.keyboard.addKey(Phaser.Keyboard.G);
/*
	// Functions
	  game = this.game; //temp solution until I can figure out a better way to refernce game
   var throwAtBuilding2 = function(mob){
      //mob.freeze();
      mob.fireAtBuilding(game, building2);
      mob.setGoalPoint(game.world.centerX, game.world.centerY, 0.5);
      //tObject = new ThrownObject(game, {key: "moltav", frame: 0}, mob.centerX, mob.centerY);
   };*/

   var onSprayIncreaseGoalweight = function(mob){
      //mob.freeze();
      mob.setGoalPoint(mob.primaryGoalX, mob.primaryGoalY, (mob.goalVectorWeight + 0.02));
      //tObject = new ThrownObject(game, {key: "moltav", frame: 0}, mob.centerX, mob.centerY);
   };


/*
   MM.addAllTriggerOnEntry(building2.x-(building2.width/2)-60, building2.y - (building2.height/2)- 60, building2.width+120, building2.height + 120, throwAtBuilding2);
   //This is for top left corner handle --> MM.addAllTriggerOnEntry(building2.x-60, building2.y - 60, building2.width+120, building2.height + 120, throwAtBuilding2);
   // The less movable an object is, the further down the list it should be
   MM.addAllTriggerOnCollision(this.emitter, onSprayIncreaseGoalweight, false);
   MM.addAllTriggerOnCollision(this.player);
   MM.addAllTriggerOnCollision(this.hydrantGroup, null, false);
   MM.addAllTriggerOnCollision(this.buildingGroup, null, false);
*/

this.game.time.events.repeat(5000, 50, newBuildingAttack, this); // every 3 seconds run function newBuildingAttack; repeat 10 times then stop

function newBuildingAttack(){

   var setGoalOffscreen = function(mob){
      var point = randomPointOffscreen(game, 50);
      mob.setGoalPoint(point.x, point.y, 0.8); // randomly head to offscreen point with weight 0.8
      mob.killOffscreen = true;
   };

      var unburntBuildings = [];
      for(var u = 0; u<this.buildingGroup.children.length; u++){
         if(this.buildingGroup.children[u].isDead === false){
            unburntBuildings.push(this.buildingGroup.children[u]);
         }
      }
      var building;
      if(unburntBuildings.length <= 0){
         building = randomOfArray(this.buildingGroup.children, 1)[0][0];
      }else{
         building = randomOfArray(unburntBuildings, 1)[0][0];
      }
      for(i=0; i<randInt(5, 2); i++){ //creates 2-4 rioters to pursue building
         var rioter = new Rioter(this.game, {key: 'assets', frame: 'rioter'}, this.game.rnd.integerInRange(0, this.game.width), this.game.rnd.integerInRange(0, this.game.height));
         //l(rioter);
         //console.dir(this.RM);
         this.RM.addMob(rioter);
         this.game.add.existing(rioter);

         //do{ // infinite loop
            rioter.positionOffscreenRandomly(game);
         //}while(game.physics.arcade.overlap(rioter, this.buildingGroup)===true);

         rioter.setOwnBuilding(building);
         rioter.setGoalPoint(building.centerX, building.centerY, 0.4);
         rioter.addEvent(setGoalOffscreen, 40); // 40 seconds after creation, set goal of rioter to offscreen
         rioter.addEvent(setGoalOffscreen, 60); // 60 seconds after creation, set goal of rioter to offscreen, goal to prevent stuck state
         rioter.addEvent(setGoalOffscreen, 100); // 100 seconds after creation, set goal of rioter to offscreen, goal to prevent stuck state

         // The less movable an object is, the further down the list it should be
         rioter.triggerOnEntry(building.x-(building.width/2)-60, building.y - (building.height/2)- 60, building.width+120, building.height + 120, throwAtBuilding);
         //This is for top left corner handle --> rioter.triggerOnEntry(building2.x-60, building2.y - 60, building2.width+120, building2.height + 120, throwAtBuilding2);
         rioter.triggerOnCollision(this.emitter, onSprayIncreaseGoalweight, false);
         rioter.triggerOnCollision(this.player);
         rioter.triggerOnCollision(this.hydrantGroup, null, false);
         rioter.triggerOnCollision(this.buildingGroup, null, false);

      }



}






var throwAtBuilding = function(mob){
   //mob.freeze();
   mob.fireAtOwnBuilding(game);
   mob.setGoalPoint(game.world.centerX, game.world.centerY, 0.5);
   //tObject = new ThrownObject(game, {key: "moltav", frame: 0}, mob.centerX, mob.centerY);
};





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

      game = this.game;







      this.RM.update(this.game);
      this.RM.killAllOutOfView(this.game);
      //l("Mobs in RM: " + this.RM.mobList.length);


   //MM.update(this.game);


   if (this.G.isDown){
      this.state.start("stGameOver");
   }

   if(this.buildingGroup.numberOfLiving() <= 0){
      this.state.start("stGameOver");
   }

   // start UI update functions
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
