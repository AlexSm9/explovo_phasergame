// Preloader state
// Loads assets
var stPreload = function(game) {
};
stPreload.prototype = {
    preload: function(){
        l("preloader_preload");
        //---/ load all assets
        //load non-atlas assets
        this.load.images(["Player", "Particle", "Test_Building1", "Test_Building2"], ["Firefighter.png", "WFParticle.png", "proto_Build1.png", "proto_Build2.png"]);
        this.load.image('WaterBar','CMPM120(WaterUI-257X84px).png');
        this.load.image('WaterLevel','CMPM120(WaterLevelUI197x35px).png');
        this.load.image('FireBar','(FireBar-81X360).png');
        this.load.image('FireLevel','(FireLevel-29X277).png');
        this.load.image('TitleScreen', 'riotfighter-titlescreen.png');
		this.load.image('building','proto_Build1.png');
		this.load.image('buildingDestroyed','proto_Build2.png');
		this.load.image('fire','FireSprite1.png');
		this.load.image('hydrant','FireHydrant.png');
        
        this.load.atlas('StartButtons', 'buttonsheet.png', 'buttonsheet.json');
        
        this.game.load.tilemap('tilemap', 'tiles/MapTile.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('TileAtlas', 'tiles/TileAtlas.png');
		this.load.path="assets/tilemap/";
		this.game.load.image('bg','tiledmap.png');
      
        //load assets from atlas (if applicable)

   },//end_preload
   create: function(){
        l("PreloadAssets_create");
        this.state.start("stTitle");
   },//end_create
};
