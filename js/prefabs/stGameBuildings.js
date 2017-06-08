// Building Group for stGame
// Add or remove buildings here
var stGameBuildingGroup = function(game){
   this.game = game;
    Phaser.Group.call(this,game);
    this.addBuilding(1000,1000,1000,setFires(),'Building01');
    this.addBuilding(1646,2285,100,setFires(),'Building03');
    this.addBuilding(758,2284,100,setFires(),'Building04');
    this.addBuilding(2620,1585,100,setFires(),'Building05');
    this.addBuilding(628,831,100,setFires(),'Building06');
    this.addBuilding(804,1655,1000,setFires(),'Building07');
    this.addBuilding(1654,199,100,setFires(),'Building08');
    this.addBuilding(1726,1567,1000,setFires(),'Building09');

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
