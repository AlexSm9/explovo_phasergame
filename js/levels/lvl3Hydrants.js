var lvl3HydrantGroup = function(game,player){
    this.game = game;
    this.player = player;
    Phaser.Group.call(this,game);

    this.addHydrant(2377,1440);
    this.addHydrant(2752,116);
    this.addHydrant(2240,500);
    this.addHydrant(1418,226);
    this.addHydrant(372,1216);
    this.addHydrant(830,2122);
    this.addHydrant(2312,2400);
    this.addHydrant(3166,2126);
    this.addHydrant(530,220);
}

lvl3HydrantGroup.prototype = Object.create(Phaser.Group.prototype);
lvl3HydrantGroup.prototype.constructor = lvl3HydrantGroup; // creation call

lvl3HydrantGroup.prototype.addHydrant = function(x,y){
   this.hydrant = new Hydrant(this.game,x,y,this.player);
   this.add(this.hydrant);
};
