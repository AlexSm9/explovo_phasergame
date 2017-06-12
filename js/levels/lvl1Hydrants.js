var lvl1HydrantGroup = function(game,player){
    this.game = game;
    this.player = player;
    Phaser.Group.call(this,game);

    this.addHydrant(374,736);
    this.addHydrant(896,373);
    this.addHydrant(896,1097);
    this.addHydrant(1418,736);
}

lvl1HydrantGroup.prototype = Object.create(Phaser.Group.prototype);
lvl1HydrantGroup.prototype.constructor = lvl1HydrantGroup; // creation call

lvl1HydrantGroup.prototype.addHydrant = function(x,y){
   this.hydrant = new Hydrant(this.game,x,y,this.player);
   this.add(this.hydrant);
};
