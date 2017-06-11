// Preloader state
// Loads assets
var stPreload = function(game) {
};
stPreload.prototype = {
    preload: function(){
        //---/ load all assets

        //  -- load screens
        this.load.path = "assets/img/screens/"; // 
        this.load.image('TitleScreen', 'riotfighter-titlescreen.png'); // title screen
        this.load.image('DirectPage','DirectionsPage.png'); // instructions
		this.load.image('TutorialBG', "TutorialBG.png"); // tutorial background
        
        this.load.image('News1', "News1.png"); // newspaper 1
        this.load.image('News2', "News2.png"); // newspaper 2
        this.load.image('News3', "News3.png"); // newspaper 3
        this.load.image('GameOverPage',"GameOverScreen.png"); // game over screen

        // --  load asset sheets
        this.load.path = "assets/img/sheets/"; 
        this.load.atlas('Explosion','Exlposion.png','json/Explosion.json'); // molotov explosion
        this.load.atlas('StartButtons', 'buttonsheet.png', 'json/buttonsheet.json'); // buttons
        this.load.atlas('fires','Fires.png','json/FiresAtlas.json'); // animated fire asset
        this.load.atlas('TitleAnimation',"TitleAnimation.png","json/TitleAnimation.json"); // title screen animation
        this.load.atlas('NextButtons', 'ContinueButtons.png', 'json/ContinueButtons.json'); // continue button
        this.load.atlas('assets','normalAssets.png','json/normalAssets.json'); // all remaining assets
        this.load.atlas('buildings',"buildings.png",'json/buildings.json');

        // -- misc assets, last minute assets
        this.load.path = "assets/img/raw images/";
        // particles are incompatible with texture atlas 
        this.load.image('water','WaFParticle.png');
        this.load.image('foam', 'WFParticle.png');
        // placeholder tutorial level assets
        this.load.image('CityOSPortrait', "PLACEHOLDER_CityOSPortrait.png");
		this.load.image('RioterPortrait', "PLACEHOLDER_RioterPortrait.png");
		this.load.image('textBox', 'TextBox.png');
		
		//Buildings
		this.load.image('building1','Building1.png');
		this.load.image('building2','Building2.png');
		this.load.image('building3','Building3.png');
		this.load.image('building4','Building4.png');
		this.load.image('building5','Building5.png');
		this.load.image('building6','Building6.png');
		this.load.image('fireStation','FIREstation.png');
		this.load.image('buildingDestroyed1','BuildingDestroyed1.png');
		this.load.image('buildingDestroyed2','BuildingDestroyed2.png');
		this.load.image('buildingDestroyed3','BuildingDestroyed3.png');
		this.load.image('buildingDestroyed4','BuildingDestroyed4.png');
		this.load.image('buildingDestroyed5','BuildingDestroyed5.png');
		this.load.image('buildingDestroyed6','BuildingDestroyed6.png');
		this.load.image('fireStationDestroyed','FIREstationDestroyed.png');
		this.load.image('fTruck','FTruck.png');
		this.load.image('fTruckDestroyed','FTruckDestroyed.png');
		
        //Tilemap
		this.load.path = "assets/img/tiles/"
        this.game.load.tilemap('CityTilemap', 'CityTilemap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('CityTileset64', 'CityTileset64.png');

        //load audio assets
        this.load.path = "assets/audio/"
        this.load.audio('title_screen', 'title screen.mp3');
        this.load.audio('game_music', 'game music.mp3');
        this.load.audio('water_spray', 'water_spray.mp3');
        this.load.audio('water_end', 'water_end.mp3');
        this.load.audio('water_out1', 'water_out1.mp3');
        this.load.audio('water_out2', 'water_out2.mp3');
        this.load.audio('refill_start', 'refill_start.mp3');
        this.load.audio('refill', 'refill.mp3');
        this.load.audio('refill_done', 'refill_done.mp3');
        this.load.audio('refill_notdone', 'refill_notdone.mp3');
        this.load.audio('molotov', 'molotov.mp3');
        this.load.audio('fireSizzle','sizzle.mp3');
        this.load.audio('fire', 'fire.mp3');
        this.game.load.audio("whirling", 'newstransition.mp3');
    
    },//end_preload
    create: function(){
        l("PreloadAssets_create");
        this.game.sound.setDecodedCallback(['title_screen', 'game_music'], this.start, this);
    },//end_create
    start: function(){
         this.state.start("stTitle");
    }, //end_start
};