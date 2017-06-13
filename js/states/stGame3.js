//Main game State
var stGame3 = function(game) {
    this.game = game;
   var RM;
   var PM;
   var buildingGroup;
   var hydrantGroup;
   var player;

   //_Rioter
};
stGame3.prototype = {
   preload: function(){
      this.game.time.advancedTiming = true;
      this.RM = new MobManager(100, 50, 100, 1, 1.5, 1);
      this.PM = new MobManager(150, 75, 100, 1, 1.5, 1.5);

   },//end_preload

   create: function() {
		//--/ variable assignments
        //--/ tilemap variable
        this.game.stage.backgroundColor = "#228B22";
        this.game.add.image(0,0,'Level3TileMapIMAGE');
       this.game.world.setBounds(0,0,3328,2560); // initialize world bounds
      //this.game.add.tileSprite(0,0,1200,912,'bg');
        /*this.map = this.game.add.tilemap('Level3Tilemap');
        this.map.addTilesetImage('CityTileset64', 'CityTileset64');
        this.backgroundLayer = this.map.createLayer('Background');
        this.groundLayer = this.map.createLayer('ForeGround');
		this.groundLayer.resizeWorld();*/

		//groups for ordering
		this.hydrantLayer = this.game.add.group();
		this.rioterLayer = this.game.add.group();
		this.protesterLayer = this.game.add.group();
		this.emitterLayer = this.game.add.group();
		this.playerLayer = this.game.add.group();
		this.buildingLayer = this.game.add.group();
		this.uiLayer = this.game.add.group();

        //Win flag
        this.winnable = false;

        // Create a new Player
        this.player = new Player(this.game,1630, 1300, 'assets' , 'firefighter');
		this.playerLayer.add(this.player);
        this.game.camera.focusOnXY(this.player.x,this.player.y);
        this.game.camera.follow(this.player,4,0.1,0.1);  // set camera to player

        // Attach hose to player object
        this.emitter = new WaterHose(this.game, this.player, 30, 15);
        this.emitterLayer.add(this.emitter);

    // Create environment
        this.hydrantGroup = new lvl3HydrantGroup(this.game,this.player); // Hydrants
		this.hydrantLayer.add(this.hydrantGroup);
        this.buildingGroup = new lvl3BuildingGroup(this.game); // Buildings
		this.buildingLayer.add(this.buildingGroup);

		var pLayer = this.playerLayer;
		this.buildingGroup.forEach(function(building){
			pLayer.add(building.fireGroup);
			pLayer.add(building.foamGroup);
		});

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
        this.waves = this.game.time.events.repeat(2000, 70, newBuildingAttack, this); // every 2 seconds run function newBuildingAttack; repeat 70 times then stop
        // Once this timer ends, enable win flag
        this.waves.timer.onComplete.addOnce(function(){
            this.winnable = true;
            //console.log("winnable: " + this.winnable);
            // alert the player that they can win
            var alert = this.sound.add('alarm');
            alert.play();
            // keep text on screen and tween until they finish the level
            var winMes = this.game.add.text(400,100,"Riot is dispersing!\nPut out the remaining fires!",{align:'center',fill:'#FFF',font:'18pt Arial'});
            winMes.anchor.x = 0.5;
            winMes.anchor.y = 0.5;
            winMes.fixedToCamera = true;
            this.game.add.tween(winMes).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true); 
        },this);

        // Peaceful protester spawn timer
        this.game.time.events.repeat(5000, 10, createProtesters, this); // every 6 seconds run function newBuildingAttack; repeat 10 times then stop


            // Functions
        var onSprayIncreaseGoalweight = function(mob){
            //mob.freeze();
            mob.setGoalPoint(mob.primaryGoalX, mob.primaryGoalY, (mob.goalVectorWeight + 0.02));
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
            for(var i=0; i<randInt(5, 3); i++){ //creates 3-4 rioters to pursue building
                var rioter = new Rioter(this.game, {key: 'assets', frame: 'rioter'}, this.game.rnd.integerInRange(0, this.game.width), this.game.rnd.integerInRange(0, this.game.height));
				this.rioterLayer.add(rioter);
                this.RM.addMob(rioter);

                    rioter.positionOffscreenRandomly(game);

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
        };

        var onSprayBecomeRioter = function(mob){
            var collisionArray = [{with: emitter, cb: onSprayIncreaseGoalweight}, {with: player}, {with: hydrantGroup}, {with: buildingGroup}];
            var eventArray = [{cb: setGoalOffscreen, time: 40}, {cb: setGoalOffscreen, time: 60}, {cb: setGoalOffscreen, time: 100}];
            mob.becomeRioter(game, {key: 'assets', frame: 'rioter'}, chooseUnburntBuilding(), RioterManager, ProtesterManager, collisionArray, eventArray);
        };

        for(var i=0; i<randInt(4, 1); i++){
            var protester = new Protester(this.game, {key: 'protester', frame: 0}, this.game.rnd.integerInRange(0, this.game.width), this.game.rnd.integerInRange(0, this.game.height));
			this.protesterLayer.add(protester);
            this.PM.addMob(protester);
            protester.positionOffscreenRandomly(game);

            triggerToNewPoint(protester);

            protester.triggerOnCollision(this.emitter, onSprayBecomeRioter, false);
            protester.triggerOnCollision(this.player);

            // Potential for slowdown with many mobs, use the second commented line instead if slowdown too significant
            protester.triggerOnCollision(this.rioterLayer, null, false);

            protester.triggerOnCollision(this.hydrantGroup, null, false);
            protester.triggerOnCollision(this.buildingGroup, null, false);
        }

        }

        var throwAtBuilding = function(mob){
        //mob.freeze();
        mob.fireAtOwnBuilding(game);
        mob.setGoalPoint(game.world.centerX, game.world.centerY, 0.5);
        };

        // Create UI
        this.waterUI = new WaterUI(this.game,this.player,70,60);
        this.fireUI = new FireUI(this.game,this.buildingGroup,765,355);
		this.pointer = this.game.add.sprite(0, 0, 'assets','crosshair');
        this.pointer.anchor.set(0.5,0.5);

		this.uiLayer.add(this.waterUI.uiInner);
		this.uiLayer.add(this.fireUI.uiInner);
		this.uiLayer.add(this.waterUI.uiOuter);
		this.uiLayer.add(this.fireUI.uiOuter);
		this.uiLayer.add(this.pointer);

},//end_create

   update: function(){
      game = this.game;

      this.RM.update(this.game);
      this.RM.killAllOutOfView(this.game);
      this.PM.update(this.game);

  // if (this.G.isDown){
    //  this.gameWin.dispatch();
  // }
   // Loss Condition
   //  IF city life is below 40%, signal game over
   if(this.buildingGroup.countLiving() == 0){
      this.gameOver.dispatch();
   }

   // Win Condition
   // IF no more rioters and fire, call WIN
   if(this.winnable == true){
        let currentFires = 0;
        this.buildingGroup.forEach(function(building){
            currentFires += building.fireGroup.countLiving();
        },this)
        if (currentFires == 0){ // If fires are all put out
             this.gameWin.dispatch();
        }
        else{
            //console.log(currentFires);
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
        this.game.state.previousState = 'stGame3';
        this.game.state.start('stGameOver');
      })
      this.camera.fade("#000000",3000); // fade camera
      this.bg_music.fadeOut(3000);
    },

// Fade the camera before going to next stage context
    fadeWin: function(){
      this.camera.onFadeComplete.add(function(){
        this.game.state.previousState = 'stGame3';
        this.game.state.start('stContext4');
      })
      this.game.time.events.add(2000,function(){
          console.log('delayed');
        this.camera.fade("#000000",3000); // fade camera
        this.bg_music.fadeOut(3000);
      },this);
    },


  // render: function() {
		// if(this.buildingGroup != null)
			// this.game.debug.body(this.buildingGroup.building);
	// }
};//end_s1Game
