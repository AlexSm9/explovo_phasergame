//tutoral... is very nice yes?
var stTutorialLevel = function(game) {
	var MM;
};
stTutorialLevel.prototype = {
	preload: function(){
		//Rioter_
		MM = new MobManager(100, 50, 100, 1, 1.5, 1);
		//_Rioter
	},//end_preload

	create: function(){
		l("Tutorial_create");

		this.game.world.setBounds(0,0,2400,1600);
		this.game.stage.backgroundColor = "#228B22";

		this.buildingGroup = this.game.add.group(); // generate building group
		this.hydrantGroup = this.game.add.group(); // generate hydrant group

		// add and play music (MUSIC IS WEIRD BECAUSE PAUSES)
		//this.bg_music = this.game.add.audio('game_music');
		//this.bg_music.play('', 0, 1, true);

		//Create UI
		this.pointer = this.game.add.sprite(0, 0, 'assets', 'crosshair');
		this.pointer.anchor.set(0.5,0.5);
		this.pointer.visible = false;

		this.end = damageFire = function(particle,building){
			particle.kill();
			building.damageFire();
		}

		this.instructor = this.game.add.image(-50, 320, 'CityOSPortrait');
		this.instructor.scale.setTo(0.7, 0.7);
		this.instructor.fixedToCamera = true;

		this.antagonist = this.game.add.image(550, 300, 'RioterPortrait');
		this.antagonist.scale.setTo(0.6, 0.6);
		this.antagonist.visible = false;
		this.antagonist.fixedToCamera = true;

		this.textBox = this.game.add.image(0, 500, 'textBox');
		this.textBox.fixedToCamera = true;
		this.text1 = this.add.text(25, 515, 'NOW_BOOTING: "Emeregency Riot Training Protocol"', {fontSize: '15px', fill: 'lime'});
		this.text1.fixedToCamera = true;
		this.text2 = this.add.text(25, 535, 'Hello <Firefighter_name_here>,', {fontSize: '15px', fill: 'white'});
		this.text2.fixedToCamera = true;
		this.text3 = this.add.text(25, 555, 'Welcome to RiotOS', {fontSize: '15px', fill: 'white'});
		this.text3.fixedToCamera = true;
		this.continueText = this.add.text(710, 510, 'Continue...', {fontSize: '15px', fill: 'white'});
		this.continueText.fixedToCamera = true;

		this.button = this.game.add.button(750, 565, 'NextButtons', this.start, this,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.2,0.2);
		this.button.fixedToCamera = true;
	},//end_create

	update: function(){
		MM.update(this.game);
		if(this.waterUI != null)
			this.waterUI.update();

		if(this.fireUI != null)
			this.fireUI.update();

		// - Collisions -
		if(this.buildingGroup.length != 0){
			// Buildings
			//game = this.game;
			this.game.physics.arcade.collide(this.emitter, this.buildingGroup,this.emitter.buildingCollision); // emitter with buildings
			this.game.physics.arcade.collide(this.player, this.buildingGroup); // player with buildings

			// Fires
			this.buildingGroup.forEach(function(building){
				this.game.physics.arcade.overlap(this.emitter,building.fireGroup,building.damageFire); // emitter with fire
			},this);

			if(this.building.fireGroup.countLiving() > 0 && this.antagonist.visible == false)
				this.tutorial10();
			if(this.building.health > 150 && this.building.health < 151)
				this.tutorial10();
			if(this.building.health > 100 && this.building.health < 101)
				this.tutorial10();
			if(this.building.health > 50 && this.building.health < 51)
				this.tutorial10();

			if(this.building.fireGroup.countLiving() == 0 && this.building.health < 200)
				this.tutorialWin();

			if(this.building.isDead == true)
				this.tutorialFail();
		}

		//cursor
		this.pointer.x = this.game.camera.x + this.game.input.x -0;
		this.pointer.y = this.game.camera.y + this.game.input.y -0;
	},//end_update

	start: function() {
		this.button.destroy();

		// Create a new Player
		this.player = new Player(this.game,600, 300, 'assets', 'firefighter');
		this.game.camera.follow(this.player,4,0.1,0.1);  // set camera to player
		this.pointer.visible = true;

		this.text1.text = "Loading Firefighter.exe ... Complete";
		this.text2.text = "You can use WASD to move around and the mouse cursor to aim";
		this.text3.text = "Try it out now...";

		//new button
		this.button = this.game.add.button(this.game.camera.x + 750, this.game.camera.y + 565, 'NextButtons', this.tutorial01, this,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.2,0.2);
		this.button.fixedToCamera = true;

		//ORDERING BULLSHIT
		this.instructor.bringToTop();
		this.antagonist.bringToTop();
		this.textBox.bringToTop();
		this.text1.bringToTop();
		this.text2.bringToTop();
		this.text3.bringToTop();
		this.continueText.bringToTop();
		this.button.bringToTop();
		this.pointer.bringToTop();

		this.game.paused = true;
		this.pointer.visible = false;
	},//end start

	tutorial01: function() {
		this.game.paused = false;
		this.pointer.visible = true;
		this.instructor.visible = false;

		this.button.destroy();

		this.text1.text = "";
		this.text2.text = "";
		this.text3.text = "";

		//new button
		this.button = this.game.add.button(750, 565, 'NextButtons', this.tutorial02, this,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.2,0.2);
		this.button.fixedToCamera = true;
	},//end tutorial01

	tutorial02: function() {
		this.button.destroy();
		this.instructor.visible = true;

		// Attach hose to player object
		this.emitter = new WaterHose(this.game, this.player, 30,15);
		this.waterUI = new WaterUI(this.game,this.player, 70, 60);

		this.text1.text = "Installing FireHose Module (CAUTION: Is extremely deadly)";
		this.text2.text = "Use your left mouse button to spray water from your hose";
		this.text3.text = "Your current water reserve is shown at the top left";

		//new button
		this.button = this.game.add.button(this.game.camera.x + 750, this.game.camera.y + 565, 'NextButtons', this.tutorial03, this,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.2,0.2);
		this.button.fixedToCamera = true;

		//ORDERING BULLSHIT
		this.world.sendToBack(this.emitter);

		this.game.paused = true;
		this.pointer.visible = false;
	},//end tutorial02

	tutorial03: function() {
		this.button.destroy();

		//Create a hydrant
		this.hydrant = new Hydrant(this.game,455,200,this.player);
		this.hydrantGroup.add(this.hydrant);

		this.text1.text = "Configuring HYDRANT ... Complete";
		this.text2.text = "HYDRANT Module brought to you by InfiniWater Corp.", {fontSize: '15px', fill: 'red'};
		this.text3.text = "You can use fire hydrants to replenish your water supply";

		//new button
		this.button = this.game.add.button(this.game.camera.x + 750, this.game.camera.y + 565, 'NextButtons', this.tutorial04, this,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.2,0.2);
		this.button.fixedToCamera = true;

		//ORDERING BULLSHIT
		this.world.sendToBack(this.emitter);
		this.world.sendToBack(this.hydrantGroup);
	},//end tutorial03

	tutorial04: function() {
		this.game.paused = false;
		this.pointer.visible = true;
		this.instructor.visible = false;

		this.button.destroy();

		this.text1.text = "";
		this.text2.text = "";
		this.text3.text = "";

		//new button
		this.button = this.game.add.button(750, 565, 'NextButtons', this.tutorial05, this,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.2,0.2);
		this.button.fixedToCamera = true;
	},//end tutorial04

	tutorial05: function() {
		this.button.destroy();
		this.instructor.visible = true;

		//Create a building
		this.building = new Building(this.game,326,300,200,0,'Building06');
		this.buildingGroup.add(this.building);

		if(this.game.physics.arcade.overlap(this.player, this.building)){
			this.player.x = 550;
			this.player.y = 280;
		}


		this.bg = this.game.add.image(0, 0, 'TutorialBG');
		this.bg.scale.setTo(2,2);

		this.fireUI = new FireUI(this.game,this.buildingGroup, 765, 355);
		this.fireUI.visible = false;

		this.text1.text = "Loading SimEnv_v1007.exe ... Complete";
		this.text2.text = "It is your duty to guard the city buildings from any potential harm";
		this.text3.text = "The total health of all the buildings in the city is shown to the right, it will decrease as the city burns";

		//new button
		this.button = this.game.add.button(this.game.camera.x + 750, this.game.camera.y + 565, 'NextButtons', this.tutorial06, this,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.2,0.2);
		this.button.fixedToCamera = true;

		//ORDERING BULLSHIT
		this.world.sendToBack(this.bg);
		this.world.moveUp(this.buildingGroup);
		this.world.bringToTop(this.instructor);
		this.world.bringToTop(this.antagonist);
		this.world.bringToTop(this.textBox);
		this.world.bringToTop(this.text1);
		this.world.bringToTop(this.text2);
		this.world.bringToTop(this.text3);
		this.world.bringToTop(this.continueText);
		this.world.bringToTop(this.button);
		this.world.bringToTop(this.waterUI);
		this.world.bringToTop(this.fireUI);
		this.world.bringToTop(this.pointer);

		this.game.paused = true;
		this.pointer.visible = false;
	},//end tutorial05

	tutorial06: function() {
		this.game.paused = false;
		this.pointer.visible = true;
		this.instructor.visible = false;

		this.button.destroy();

		this.text1.text = "";
		this.text2.text = "";
		this.text3.text = "";

		//new button
		this.button = this.game.add.button(750, 565, 'NextButtons', this.tutorial07, this,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.2,0.2);
		this.button.fixedToCamera = true;
	},//end tutorial06

	tutorial07: function() {
		this.button.destroy();
		this.instructor.visible = true;
		rioter = new Rioter(this.game, {key: 'assets', frame: 'rioter'}, 600, 400);
		MM.addMob(rioter);
		this.game.add.existing(rioter);

		building = this.buildingGroup.getRandom();
		MM.setAllGoal(building.centerX, building.centerY, 0.4);

		game = this.game;
		var throwAtBuilding = function(mob){
			mob.fireAtBuilding(game, building);
			mob.setGoalPoint(game.world.centerX, game.world.centerY, 0.5);
		};

		var onSprayIncreaseGoalweight = function(mob){
			mob.setGoalPoint(mob.primaryGoalX, mob.primaryGoalY, (mob.goalVectorWeight + 0.02));
		};

		MM.addAllTriggerOnEntry(building.x-(building.width/2)-100, building.y - (building.height/2)- 100, building.width+200, building.height + 200, throwAtBuilding);
		MM.addAllTriggerOnCollision(this.emitter, onSprayIncreaseGoalweight, false);
		MM.addAllTriggerOnCollision(this.player);
		MM.addAllTriggerOnCollision(this.hydrantGroup, null, false);
		MM.addAllTriggerOnCollision(this.buildingGroup, null, false);

		rioter.freeze(true);

		this.text1.text = "Loading Rioter.exe ... Complete";
		this.text2.text = "Look out!";
		this.text3.text = "A malicious individual is approaching city property, engage FULL ALERT";

		//new button
		this.button = this.game.add.button(this.game.camera.x + 750, this.game.camera.y + 565, 'NextButtons', this.tutorial08, this,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.2,0.2);
		this.button.fixedToCamera = true;

		//ORDERING BULLSHIT
		this.world.sendToBack(rioter);
		this.world.sendToBack(this.emitter);
		this.world.sendToBack(this.hydrantGroup);
		this.world.sendToBack(this.bg);
		this.world.bringToTop(this.instructor);
		this.world.bringToTop(this.antagonist);
		this.world.bringToTop(this.textBox);
		this.world.bringToTop(this.text1);
		this.world.bringToTop(this.text2);
		this.world.bringToTop(this.text3);
		this.world.bringToTop(this.continueText);
		this.world.bringToTop(this.button);
		this.world.bringToTop(this.waterUI);
		this.world.bringToTop(this.fireUI);
		this.world.bringToTop(this.pointer);

		this.game.paused = true;
		this.pointer.visible = false;
	},//end tutorial07

	tutorial08: function() {
		this.button.destroy();
		this.instructor.visible = false;
		this.antagonist.visible = true;
		rioter.freeze(false);

		this.text2.setStyle({fontSize: '25px', fill: 'orange'});
		this.text3.setStyle({fontSize: '25px', fill: 'orange'});

		this.text1.text = "";
		this.text2.text = "Down with the system, glory to the people!";
		this.text3.text = "Hehehe";

		//new button
		this.button = this.game.add.button(this.game.camera.x + 750, this.game.camera.y + 565, 'NextButtons', this.tutorial09, this,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.2,0.2);
		this.button.fixedToCamera = true;
	},//end tutorial08

	tutorial09: function() {
		this.game.paused = false;
		this.pointer.visible = true;
		this.instructor.visible = false;
		this.antagonist.visible = false;

		this.button.destroy();

		this.text2.setStyle({fontSize: '15px', fill: 'white'});
		this.text3.setStyle({fontSize: '15px', fill: 'white'});

		this.text1.text = "";
		this.text2.text = "";
		this.text3.text = "";
		this.continueText.visible = false;
		this.textBox.visible = false;
	},//end tutorial09

	tutorial10: function() {
		this.game.paused = false;
		this.pointer.visible = true;
		this.instructor.visible = false;
		this.antagonist.visible = true;

		this.continueText.visible = true;
		this.textBox.visible = true;

		this.button.destroy();

		this.text2.setStyle({fontSize: '25px', fill: 'orange'});
		this.text3.setStyle({fontSize: '25px', fill: 'orange'});

		if(this.building.health < 51){
			this.text1.text = "";
			this.text2.text = "HOHO! I think it's starting to collapse!";
			this.text3.text = "Just a bit more!";
		}
		else if(this.building.health < 101){
			this.text1.text = "";
			this.text2.text = "BURN TO ASH!";
			this.text3.text = "";
		}
		else if(this.building.health < 151){
			this.text1.text = "";
			this.text2.text = "Building's gettin' toasty";
			this.text3.text = "Feed the flames!";
		}
		else{
			this.text1.text = "";
			this.text2.text = "HAHA!";
			this.text3.text = "Look at it go!";
		}

		//new button
		this.button = this.game.add.button(750, 565, 'NextButtons', this.tutorial11, this,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.2,0.2);
		this.button.fixedToCamera = true;
	},//end tutorial10

	tutorial11: function() {
		this.instructor.visible = true;
		this.antagonist.visible = false;

		this.button.destroy();

		this.text2.setStyle({fontSize: '15px', fill: 'white'});
		this.text3.setStyle({fontSize: '15px', fill: 'white'});

		this.text1.text = "FIRE DETECTED";
		this.text2.text = "The fire is doing more damage the longer it is burning";
		this.text3.text = "You must put it out as soon as possible, aim your hose and shoot!";

		//new button
		this.button = this.game.add.button(this.game.camera.x + 750, this.game.camera.y + 565, 'NextButtons', this.tutorial09, this,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.2,0.2);
		this.button.fixedToCamera = true;

		this.game.paused = true;
		this.pointer.visible = false;
	},//end tutorial11

	tutorialWin: function() {
		this.instructor.visible = true;
		this.antagonist.visible = false;

		this.button.destroy();

		this.text2.setStyle({fontSize: '15px', fill: 'white'});
		this.text3.setStyle({fontSize: '15px', fill: 'white'});

		this.text1.text = "INITIALIZING SUCCESS PROTOCOL ... Complete";
		this.text2.text = "Well done! Your firefighting skills are <insert_compliment_here/>";
		this.text3.text = "You are adequately prepared to defend your city";

		//new button
		this.button = this.game.add.button(750, 565, 'NextButtons', this.startGame, this,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.2,0.2);
		this.button.fixedToCamera = true;

		this.game.paused = true;
		this.pointer.visible = false;
	},//end tutorialWin

	tutorialFail: function() {
		this.instructor.visible = true;
		this.antagonist.visible = false;

		this.button.destroy();

		this.text2.setStyle({fontSize: '15px', fill: 'white'});
		this.text3.setStyle({fontSize: '15px', fill: 'white'});

		this.text1.text = "INITIALIZING FAILURE PROTOCOL ... Complete";
		this.text2.text = "Huh? You couldn't even save the tutorial building?!";
		this.text3.text = "OverlordOS help us all...";

		//new button
		this.button = this.game.add.button(750, 565, 'NextButtons', this.startGame, this,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.2,0.2);
		this.button.fixedToCamera = true;

		this.game.paused = true;
		this.pointer.visible = false;
	},//end tutorialFail

	startGame: function() {
		this.game.paused = false;
		this.state.start("stContext1");
	}//end startGame
};
