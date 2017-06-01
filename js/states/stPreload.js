// Preloader state
// Loads assets
var stPreload = function(game) {
};
stPreload.prototype = {
    preload: function(){
        l("preloader_preload");
        //---/ load all assets
        //load non-atlas assets
        this.load.images(["Player", "Particle", "Test_Building1", "Test_Building2"], ["Firefighter1.png", "WaFParticle.png", "proto_Build12.png", "Building1-FinalBurn.png"]);
        this.load.image('WaterBar','CMPM120(WaterUI-257X84px).png');
        this.load.image('WaterLevel','CMPM120(WaterLevelUI197x35px).png');
        this.load.image('FireBar','(FireBar-81X360).png');
        this.load.image('FireLevel','(FireLevel-29X277).png');
        this.load.image('TitleScreen', 'riotfighter-titlescreen.png');
		this.load.image('building','proto_Build1.png');
		this.load.image('fire','Fire3.png');
		this.load.image('buildingDestroyed','Building1-FinalBurn.png');
		this.load.image('hydrant','FireHydrant.png');
        this.load.image('DirectPage','DirectionsPage.png');
        this.load.image('News1', "News1.png");
        this.load.image('News2', "News2.png");
        this.load.image('News3', "News3.png");

        this.load.image('moltav','Moltav.png');
        this.load.image('rioter','Rioter.png');



		this.load.image('indi', 'fireIndicator.png');
        
      //  this.load.atlas('StartButtons', 'buttonsheet.png', 'buttonsheet.json');

        this.load.image('GameOverPage',"GameOverScreen.png");

        this.load.atlas('StartButtons', 'buttonsheet.png', 'buttonsheet.json');

        this.load.atlas('NextButtons', 'ContinueButtons.png', 'ContinueButtons.json');
        this.game.load.audio("whirling", 'audio/newstransition.mp3');

        this.game.load.tilemap('tilemap', 'tiles/MapTile.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('TileAtlas', 'tiles/TileAtlas.png');
		this.load.path="assets/tilemap/";
		this.game.load.image('bg','tiledmap.png');



        //load assets from atlas (if applicable)
        
        //load audio assets
        this.load.path = "assets/audio/"
        this.load.audio('water_spray', 'water_spray.mp3');
        this.load.audio('water_end', 'water_end.mp3');
        this.load.audio('water_out1', 'water_out1.mp3');
        this.load.audio('water_out2', 'water_out2.mp3');

   },//end_preload
   create: function(){
        l("PreloadAssets_create");
        this.state.start("stTitle");
   },//end_create
};
