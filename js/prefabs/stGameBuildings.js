// Building Group for stGame
// Add or remove buildings here
var stGameBuildingGroup = function(game){
   this.game = game;
    Phaser.Group.call(this,game);
    this.addBuilding(1722,1575,250000,0,'Building07', 289, 397, 269, 346);

    // this.addBuilding(2786,2313,300000,0,'Building03', 300, 300, 300, 300);
    // this.addBuilding(2267,194,200000,0,'Building04', 300, 300, 300, 300);
    // this.addBuilding(830,1659,200000,0,'Building05', 300, 300, 300, 300);
    // this.addBuilding(1660,2314,200000,0,'Building09', 300, 300, 300, 300);
    // this.addBuilding(988,975,200000,0,'Building07', 300, 300, 300, 300);
    // this.addBuilding(2610,930,200000,0,'Building06', 300, 300, 300, 300);

    // function setFires(){
      // return 0;
   // }
};

stGameBuildingGroup.prototype = Object.create(Phaser.Group.prototype);
stGameBuildingGroup.prototype.constructor = stGameBuildingGroup; // creation call

stGameBuildingGroup.prototype.addBuilding = function( x, y, health, fires, src, height, width, bodyHeight, bodyWidth){
   this.building = new Building(this.game, x, y, health, fires, src, height, width, bodyHeight, bodyWidth);
   this.add(this.building);
};

stGameBuildingGroup.prototype.numberOfLiving = function(){
   var unburntBuildings = [];
   for(var u = 0; u<this.children.length; u++){
      if(this.children[u].isDead === false){
         unburntBuildings.push(this.children[u]);
      }
   }
   return unburntBuildings.length;
};

stGameBuildingGroup.prototype.numberOfDead = function(){
   var burntBuildings = [];
   for(var u = 0; u<this.children.length; u++){
      if(this.children[u].isDead === true){
         burntBuildings.push(this.children[u]);
      }
   }
   return burntBuildings.length;
};
