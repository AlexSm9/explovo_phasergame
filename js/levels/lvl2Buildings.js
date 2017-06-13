// Building Group for stGame
// Add or remove buildings here
var lvl2BuildingGroup = function(game){
   this.game = game;
    Phaser.Group.call(this,game);
	
    this.addBuilding(992, 992, 2500,0,'Building04r', 348, 770, 356, 848); //hospital rotated +28/66
    this.addBuilding(1568, 992, 2500,0,'Building05r', 372, 700, 327, 472); //spinner factory rotated +52/92
	this.addBuilding(329, 224, 2500,0,'Building06', 572, 382, 504, 317); //meme factory +60/62
	this.addBuilding(2176, 1140, 2000,0,'Building02', 426, 251, 559, 330); //firehouse +42/80
	this.addBuilding(2235, 800, 2000,0,'Building01r', 558, 366, 378, 317); //squarish plain +46/46
	this.addBuilding(992, 224, 2000,0,'Building03', 368, 392, 268, 346); //bevel roof +48/72
	this.addBuilding(992, 1760, 2000,0,'Building03', 368, 392, 268, 346); //bevel roof +48/72
	this.addBuilding(1568, 224, 2000,0,'Building03', 368, 392, 268, 346); //bevel roof +48/72
	this.addBuilding(1568, 1760, 2000,0,'Building03', 368, 392, 268, 346); //bevel roof +48/72
	this.addBuilding(2250, 229, 2000,0,'Building07', 592, 380, 504, 298); //long plain +60/80
	this.addBuilding(2250, 1745, 2000,0,'Building07', 592, 380, 504, 298); //long plain +60/80
	this.addBuilding(305, 1184, 2000,0,'Building07', 592, 380, 504, 298); //long plain +60/80
	this.addBuilding(320, 800, 2000,0,'Building01r', 558, 366, 378, 317); //squarish plain +46/46
	this.addBuilding(320, 1760, 2000,0,'Building01r', 558, 366, 378, 317); //squarish plain +46/46
};

lvl2BuildingGroup.prototype = Object.create(Phaser.Group.prototype);
lvl2BuildingGroup.prototype.constructor = lvl2BuildingGroup; // creation call

lvl2BuildingGroup.prototype.addBuilding = function( x, y, health, fires, src, width, height, bodyWidth, bodyHeight){
   this.building = new Building(this.game, x, y, health, fires, src, width, height, bodyWidth, bodyHeight);
   this.add(this.building);
};

lvl2BuildingGroup.prototype.numberOfLiving = function(){
   var unburntBuildings = [];
   for(var u = 0; u<this.children.length; u++){
      if(this.children[u].isDead === false){
         unburntBuildings.push(this.children[u]);
      }
   }
   return unburntBuildings.length;
};

lvl2BuildingGroup.prototype.numberOfDead = function(){
   var burntBuildings = [];
   for(var u = 0; u<this.children.length; u++){
      if(this.children[u].isDead === true){
         burntBuildings.push(this.children[u]);
      }
   }
   return burntBuildings.length;
};
