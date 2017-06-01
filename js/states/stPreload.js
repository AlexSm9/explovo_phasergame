// Preloader state
// Loads assets
var stPreload = function(game) {
};
stPreload.prototype = {
    preload: function(){
        l("preloader_preload");
        //---/ load all assets
        //Player
        this.load.images(["Player", "Particle"], ["Firefighter1.png", "WaFParticle.png"]);
		
		//Rioter (That's not how you spell Molotov -Dima)
		this.load.images(["rioter", "moltav"], ["Rioter.png", "Moltav.png"]);
		
		//UI
        this.load.image('WaterBar','CMPM120(WaterUI-257X84px).png');
        this.load.image('WaterLevel','CMPM120(WaterLevelUI197x35px).png');
        this.load.image('FireBar','(FireBar-81X360).png');
        this.load.image('FireLevel','(FireLevel-29X277).png');
		this.load.image('indi', 'fireIndicator.png');
        this.load.image('TitleScreen', 'riotfighter-titlescreen.png');
		this.load.image('DirectPage','DirectionsPage.png');
		this.load.image('News1', "News1.png");
        this.load.image('News2', "News2.png");
        this.load.image('News3', "News3.png");
		this.load.image('GameOverPage',"GameOverScreen.png");
		this.load.atlas('StartButtons', 'buttonsheet.png', 'buttonsheet.json');
		this.load.atlas('NextButtons', 'ContinueButtons.png', 'ContinueButtons.json');
		
		//Buildings
		this.load.path = "assets/img/Buildings/";
		this.load.spritesheet('building1','Building1Sheet.png',328,470);
		this.load.spritesheet('building2','Building2Sheet.png',415,343);
		this.load.spritesheet('building3','Building3Sheet.png',698,480);
		this.load.spritesheet('building4','Building4Sheet.png',337,372);
		this.load.spritesheet('building5','Building5Sheet.png',289,400);
		this.load.spritesheet('building6','Building6Sheet.png',615,1130);
		this.load.spritesheet('fireStation','FIREstationSheet.png',448,600);
		this.load.spritesheet('fTruck','FTruckSheet.png',175,286);
		
		//other
		this.load.path = "assets/img/";
		//this.load.image('fire','Fire3.png');
		this.load.image('hydrant','FireHydrant.png');
		this.load.image('crosshair','crosshair.png');
		
		//audio
        this.load.path = "assets/audio/"
        this.load.audio('water_spray', 'water_spray.mp3');
        this.load.audio('water_end', 'water_end.mp3');
        this.load.audio('water_out1', 'water_out1.mp3');
        this.load.audio('water_out2', 'water_out2.mp3');
		this.load.audio("whirling", 'newstransition.mp3');
        
		//Tilemap
		this.load.path = "assets/img/Tiles/";
        this.game.load.tilemap('CityTilemap', 'CityTilemap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('CityTileset64', 'CityTileset64.png');
   },//end_preload
   
   create: function(){
        l("PreloadAssets_create");
        this.state.start("stTitle");
   },//end_create
};
