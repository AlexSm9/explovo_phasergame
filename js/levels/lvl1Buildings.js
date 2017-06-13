// Building Group for stGame
// Add or remove buildings here
var lvl1BuildingGroup = function(game){
   this.game = game;
    Phaser.Group.call(this,game);
	
    this.addBuilding(896, 736, 1000,0,'Building04', 690, 370, 848, 356); //hospital +66/28
    this.addBuilding(896, 192, 1000,0,'Building07', 700, 336, 504, 298); //long plain +60/80
    this.addBuilding(896, 1280, 1000,0,'Building06', 700, 318, 504, 317); //meme factory +60/62
    this.addBuilding(180, 1280, 500,0,'Building07', 316, 336, 504, 298); //long plain
    this.addBuilding(192, 736, 500,0,'Building03', 304, 392, 268, 346); //bevel roof +48/72
    this.addBuilding(192, 192, 500,0,'Building01', 302, 302, 317, 378); //squarish plain +46/46
    this.addBuilding(1600, 192, 500,0,'Building03', 304, 328, 268, 346); //bevel roof
    this.addBuilding(1600, 736, 500,0,'Building01', 302, 366, 317, 378); //squarish plain
    this.addBuilding(1600, 1280, 500,0,'Building03', 304, 328, 268, 346); //bevel roof
};

lvl1BuildingGroup.prototype = Object.create(Phaser.Group.prototype);
lvl1BuildingGroup.prototype.constructor = lvl1BuildingGroup; // creation call

lvl1BuildingGroup.prototype.addBuilding = function( x, y, health, fires, src, width, height, bodyWidth, bodyHeight){
   this.building = new Building(this.game, x, y, health, fires, src, width, height, bodyWidth, bodyHeight);
   this.add(this.building);
};

lvl1BuildingGroup.prototype.numberOfLiving = function(){
   var unburntBuildings = [];
   for(var u = 0; u<this.children.length; u++){
      if(this.children[u].isDead === false){
         unburntBuildings.push(this.children[u]);
      }
   }
   return unburntBuildings.length;
};

lvl1BuildingGroup.prototype.numberOfDead = function(){
   var burntBuildings = [];
   for(var u = 0; u<this.children.length; u++){
      if(this.children[u].isDead === true){
         burntBuildings.push(this.children[u]);
      }
   }
   return burntBuildings.length;
};
