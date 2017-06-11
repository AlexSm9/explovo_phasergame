//Main game State
var stGame = function(game) {
    this.game = game;
   var RM;
   var PM;
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
      this.PM = new MobManager(150, 75, 100, 1, 1.5, 1.5);

   },//end_preload

   create: function() {
    //--/ variable assignments
   
        //--/ tilemap variable
        this.game.world.setBounds(0,0,3200,2432); // initialize world bounds
        this.game.stage.backgroundColor = "#228B22";
      //this.game.add.tileSprite(0,0,1200,912,'bg');
        this.map = this.game.add.tilemap('CityTilemap');
        this.map.addTilesetImage('CityTileset64', 'CityTileset64');
        this.backgroundLayer = this.map.createLayer('Background');
        this.groundLayer = this.map.createLayer('ForeGround');

        //Win flag
        this.winnable = false;

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
         this.bg_sounds = this.game.add.audio('riot_sounds'); this.bg_sounds.play('', 0, 1, true);
         this.bg_music = this.game.add.audio('game_music');
         this.bg_music.play('', 0, 1, true);
       
         if (isMute === true) {
            this.bg_music.volume = 0;
         }


   // Debug Keys
    	this.G = this.game.input.keyboard.addKey(Phaser.Keyboard.G);


   // -- Conditions
         // Loss Signal
        this.gameOver = new Phaser.Signal();
        this.gameOver.addOnce(this.fadeGO,this);
        // Win Signal
        this.gameWin = new Phaser.Signal();
        this.gameWin.addOnce(this.fadeWin,this);

        // Wave Timer + Winnable flag
        this.waves = this.game.time.events.repeat(3000, 40, newBuildingAttack, this); // every 3 seconds run function newBuildingAttack; repeat 40 times then stop
        // Once this timer ends, enable win flag
        this.waves.timer.onComplete.addOnce(function(){
            this.winnable = true;
        },this);

        // Peaceful protester spawn timer  
        this.game.time.events.repeat(6000, 5, createProtesters, this); // every 6 seconds run function newBuildingAttack; repeat 10 times then stop


            // Functions
        var onSprayIncreaseGoalweight = function(mob){
            //mob.freeze();
            mob.setGoalPoint(mob.primaryGoalX, mob.primaryGoalY, (mob.goalVectorWeight + 0.02));
            //tObject = new ThrownObject(game, {key: "moltav", frame: 0}, mob.centerX, mob.centerY);
        };

        var buildingGroup = this.buildingGroup;
        function chooseUnburntBuilding(){
        var unburntBuildings = [];
        for(var u = 0; u<buildingGroup.children.length; u++){
            if(buildingGroup.children[u].isDead === false){
                unburntBuildings.push(buildingGroup.children[u]);
            }
        }
        if(unburntBuildings.length <= 0){
            return randomOfArray(buildingGroup.children, 1)[0][0];
        }else{
            return randomOfArray(unburntBuildings, 1)[0][0];
        }
        }

        var setGoalOffscreen = function(mob){
        var point = randomPointOffscreen(game, 50);
        mob.setGoalPoint(point.x, point.y, 0.8); // randomly head to offscreen point with weight 0.8
        mob.killOffscreen = true;
        };

        function newBuildingAttack(){
        var building = chooseUnburntBuilding();
            for(var i=0; i<randInt(6, 3); i++){ //creates 3-5 rioters to pursue building
                var rioter = new Rioter(this.game, {key: 'assets', frame: 'rioter'}, this.game.rnd.integerInRange(0, this.game.width), this.game.rnd.integerInRange(0, this.game.height));
                //l(rioter);
                //console.dir(this.RM);
                this.RM.addMob(rioter);

                //do{ // infinite loop
                    rioter.positionOffscreenRandomly(game);
                //}while(game.physics.arcade.overlap(rioter, this.buildingGroup)===true);

                rioter.setOwnBuilding(building);
                rioter.setGoalPoint(building.centerX, building.centerY, 0.4);

                // IF EVENTS CHANGED, also change in onSprayBecomeRioter
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

        function createProtesters(){

        var RioterManager = this.RM;
        var ProtesterManager = this.PM;
        var emitter = this.emitter;
        var player = this.player;
        var hydrantGroup = this.hydrantGroup;
        var buildingGroup = this.buildingGroup;

        var triggerToNewPoint = function(mob){
            var newPoint = randomPointOffscreen(game, 50);
            mob.setGoalPoint(newPoint.x, newPoint.y, 0.5); // randomly head to offscreen point with weight 0.8
            mob.triggerOnEntry(newPoint.x-60, newPoint.y-60, newPoint.x+120, newPoint.y+120, triggerToNewPoint); //possible reccursion issues?
            //^ Current Problem Here
        };

        var onSprayBecomeRioter = function(mob){
            var collisionArray = [{with: emitter, cb: onSprayIncreaseGoalweight}, {with: player}, {with: hydrantGroup}, {with: buildingGroup}];
            var eventArray = [{cb: setGoalOffscreen, time: 40}, {cb: setGoalOffscreen, time: 60}, {cb: setGoalOffscreen, time: 100}];
            mob.becomeRioter(game, {key: 'assets', frame: 'rioter'}, chooseUnburntBuilding(), RioterManager, ProtesterManager, collisionArray, eventArray);
        };

        for(var i=0; i<randInt(4, 1); i++){
            var protester = new Protester(this.game, {key: 'protester', frame: 0}, this.game.rnd.integerInRange(0, this.game.width), this.game.rnd.integerInRange(0, this.game.height));
            this.PM.addMob(protester);
            protester.positionOffscreenRandomly(game);

            /*var point = randomPointOffscreen(game, 50);
            protester.setGoalPoint(point.x, point.y, 0.2); // randomly head to offscreen point with weight 0.8
            protester.triggerOnEntry(point.x-60, point.y-60, point+120, point+120, triggerToNewPoint); //possible reccursion issues?
        */

            triggerToNewPoint(protester);

            protester.triggerOnCollision(this.emitter, onSprayBecomeRioter, false);
            protester.triggerOnCollision(this.player);
            protester.triggerOnCollision(this.hydrantGroup, null, false);
            protester.triggerOnCollision(this.buildingGroup, null, false);
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
        this.waterUI = new WaterUI(this.game,this.player,70,60); //water UI
        this.fireUI = new FireUI(this.game,this.buildingGroup,765,355); //fire UI
        this.musicButton = new MusicButton(this.game, this.bg_music, 1, 760, 560); //music mute/unmute button
},//end_create

   update: function(){
      game = this.game;

      this.RM.update(this.game);
      this.RM.killAllOutOfView(this.game);
      this.PM.update(this.game);

      //l("Mobs in RM: " + this.RM.mobList.length + ", Mobs in PM: " + this.PM.mobList.length);

   if (this.G.isDown){
      this.gameWin.dispatch();
   }
   // Loss Condition
   //  IF city life is below 40%, signal game over
   console.log(this.buildingGroup.countLiving());
   if(this.buildingGroup.countLiving() == 0){
      this.gameOver.dispatch();
   }

   // Win Condition
   // IF no more rioters and fire, call WIN
   if(this.winnable == true && this.RM.mobList.length == 0){
        let currentFires = 0;
        this.buildingGroup.forEach(function(building){
            currentFires += building.fireGroup.countLiving();
        },this)
        if (currentFires == 0){ // If fires are all put out
            if(this.buildingGroup.countLiving > 0){ // if any buildings are alive, end the game
                this.gameWin.dispatch();
            }
            else{ // edge case where the last fire destroys the last building
                this.gameOver.dispatch();
            }
        }
        else{
            console.log(currentFires);
        }
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

// Fade the camera before going to the game over screen
    fadeGO: function(){
      // function call when fade ends
      this.camera.onFadeComplete.add(function(){
        this.game.state.previousState = 'stGame';
        this.game.state.start('stGameOver');
      })
      this.camera.fade("#000000",3000); // fade camera
      this.bg_music.fadeOut(3000);
    },

// Fade the camera before going to next stage context
    fadeWin: function(){
      this.camera.onFadeComplete.add(function(){
        this.game.state.previousState = 'stGame';
        this.game.state.start('stContext2');
      })
      this.camera.fade("#000000",3000); // fade camera
      this.bg_music.fadeOut(3000);
    },


 /* render: function() {

	  // this.buildingGroup.forEach(function(building){
		//   building.fireGroup.forEach(function(fire){
		//	   this.game.debug.body(fire);
		 //  },this);
	   // },this);

   // display fps
     this.game.debug.text('FPS: ' + this.game.time.fps, 20, 580, 'yellow');
  }*/
};//end_s1Game
