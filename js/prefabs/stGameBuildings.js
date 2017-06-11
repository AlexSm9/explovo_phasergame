// Building Group for stGame
// Add or remove buildings here
var stGameBuildingGroup = function(game){
   this.game = game;
    Phaser.Group.call(this,game);
    this.addBuilding(1722,1575,250,0,'FIREstation');
    this.addBuilding(2786,2313,300,0,'Building03');
    this.addBuilding(2267,194,200,0,'Building04');
    this.addBuilding(830,1659,200,0,'Building05');
    this.addBuilding(1660,2314,200,0,'Building09');
    this.addBuilding(988,975,200,0,'Building07');
    this.addBuilding(2610,930,200,0,'Building06');

    function setFires(){
      return 0;
   }
};

stGameBuildingGroup.prototype = Object.create(Phaser.Group.prototype);
stGameBuildingGroup.prototype.constructor = stGameBuildingGroup; // creation call

stGameBuildingGroup.prototype.addBuilding = function(x,y,hp,fires,type){
   this.building = new Building(this.game,x,y,hp,fires,type);
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
