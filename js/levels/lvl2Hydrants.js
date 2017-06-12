var lvl2HydrantGroup = function(game,player){
    this.game = game;
    this.player = player;
    Phaser.Group.call(this,game);

    this.addHydrant(628,924);
    this.addHydrant(1420,1326);
    this.addHydrant(990,440);
    this.addHydrant(777,1758);
    this.addHydrant(2336,1316);
    this.addHydrant(2080,435);
}

lvl2HydrantGroup.prototype = Object.create(Phaser.Group.prototype);
lvl2HydrantGroup.prototype.constructor = lvl2HydrantGroup; // creation call

lvl2HydrantGroup.prototype.addHydrant = function(x,y){
   this.hydrant = new Hydrant(this.game,x,y,this.player);
   this.add(this.hydrant);
};
