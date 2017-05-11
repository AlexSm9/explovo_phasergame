// Preloader state
// Loads assets
var stPreloader = function(game) {
};
stPreloader.prototype = {
   preload: function(){
      l("preloader_preload");
      //---/ load all assets
      //load non-atlas assets
      this.load.images(["Player", "Particle", "Test_Building1", "Test_Building2"], ["Firefighter.png", "WFParticle.png", "proto_Build1.png", "proto_Build2.png"]);

      this.game.load.tilemap('tilemap', 'tiles/MapTile.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('TileAtlas', 'tiles/TileAtlas.png');
   },//end_preload
   create: function(){
      l("PreloadAssets_create");
      this.state.start("stGame");
   }//end_create
};
