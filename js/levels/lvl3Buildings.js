// Building Group for stGame
// Add or remove buildings here
var lvl3BuildingGroup = function(game){
   this.game = game;
    Phaser.Group.call(this,game);
	
	this.addBuilding(192, 256, 400,0,'Building03', 304, 456, 268, 346); //bevel roof +48/72
	this.addBuilding(192, 896, 400,0,'Building03', 304, 456, 268, 346); //bevel roof +48/72
	this.addBuilding(1056, 832, 400,0,'Building03r', 392, 304, 346, 264); //bevel roof +72/48
	this.addBuilding(1056, 1088, 400,0,'Building03r', 392, 304, 346, 264); //bevel roof +72/48
	this.addBuilding(1056, 1344, 400,0,'Building03r', 392, 304, 346, 264); //bevel roof +72/48
	this.addBuilding(2336, 256, 400,0,'Building03r', 688, 452, 346, 264); //bevel roof +72/48
	this.addBuilding(1728, 2336, 700,0,'Building04', 834, 348, 848, 356); //hospital +66/28
	this.addBuilding(1700, 1620, 800,0,'Building02r', 465, 600, 330, 559); //firehouse +80/42
	this.addBuilding(3072, 256, 400,0,'Building01', 430, 430, 317, 378); //squarish plain +46/46
	this.addBuilding(2788, 1312, 700,0,'Building04r', 500, 1060, 356, 848); //hospital rotated +28/66
	this.addBuilding(832, 2336, 400,0,'Building01r', 558, 366, 378, 317); //squarish plain +46/46
	this.addBuilding(1728, 261, 400,0,'Building07', 572, 464, 504, 298); //long plain +60/80
	this.addBuilding(896, 256, 700,0,'Building05', 732, 436, 472, 327); //spinner factory +92/52
	this.addBuilding(2720, 2336, 700,0,'Building06', 764, 382, 504, 317); //meme factory +60/62
	this.addBuilding(192, 2336, 400,0,'Building07r', 346, 380, 298, 504); //long plain +80/60
	this.addBuilding(704, 896, 400,0,'Building07r', 336, 444, 298, 504); //long plain +80/60
	this.addBuilding(704, 1312, 400,0,'Building07r', 336, 380, 298, 504); //long plain +80/60
	this.addBuilding(896, 1728, 400,0,'Building07', 700, 484, 504, 298); //long plain +60/80
	this.addBuilding(192, 1344, 500,0,'Building01', 302, 430, 317, 378); //squarish plain +46/46
	this.addBuilding(192, 1760, 400,0,'Building03', 304, 392, 268, 346); //bevel roof +48/72
	
    // this.addBuilding(896, 736, 2500,0,'Building04', 690, 370, 848, 356); //hospital +66/28
    // this.addBuilding(896, 192, 2500,0,'Building07', 700, 336, 504, 298); //long plain +60/80
    // this.addBuilding(896, 1280, 2500,0,'Building06', 700, 318, 504, 317); //meme factory +60/62
    // this.addBuilding(180, 1280, 2000,0,'Building07', 316, 336, 504, 298); //long plain
    // this.addBuilding(192, 736, 2000,0,'Building03', 304, 392, 268, 346); //bevel roof +48/72
    // this.addBuilding(192, 192, 2000,0,'Building01', 302, 302, 317, 378); //squarish plain +46/46
    // this.addBuilding(1600, 192, 2000,0,'Building03', 304, 328, 268, 346); //bevel roof
    // this.addBuilding(1600, 736, 2000,0,'Building01', 302, 366, 317, 378); //squarish plain
    // this.addBuilding(1600, 1280, 2000,0,'Building03', 304, 328, 268, 346); //bevel roof
};

lvl3BuildingGroup.prototype = Object.create(Phaser.Group.prototype);
lvl3BuildingGroup.prototype.constructor = lvl3BuildingGroup; // creation call

lvl3BuildingGroup.prototype.addBuilding = function( x, y, health, fires, src, width, height, bodyWidth, bodyHeight){
   this.building = new Building(this.game, x, y, health, fires, src, width, height, bodyWidth, bodyHeight);
   this.add(this.building);
};

lvl3BuildingGroup.prototype.numberOfLiving = function(){
   var unburntBuildings = [];
   for(var u = 0; u<this.children.length; u++){
      if(this.children[u].isDead === false){
         unburntBuildings.push(this.children[u]);
      }
   }
   return unburntBuildings.length;
};

lvl3BuildingGroup.prototype.numberOfDead = function(){
   var burntBuildings = [];
   for(var u = 0; u<this.children.length; u++){
      if(this.children[u].isDead === true){
         burntBuildings.push(this.children[u]);
      }
   }
   return burntBuildings.length;
};
