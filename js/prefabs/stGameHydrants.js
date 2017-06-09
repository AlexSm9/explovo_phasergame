var stGameHydrantGroup = function(game,player){
    this.game = game;
    this.player = player;
    Phaser.Group.call(this,game);

    this.addHydrant(1115,1440);
    this.addHydrant(800,680);
    this.addHydrant(551,1059);
    this.addHydrant(2009,1247);
    this.addHydrant(2335,1826);

    // Specific layering order
    this.game.world.moveDown(this); // now below emitter
    this.game.world.moveDown(this); // now below player
}

stGameHydrantGroup.prototype = Object.create(Phaser.Group.prototype);
stGameHydrantGroup.prototype.constructor = stGameBuildingGroup; // creation call

stGameHydrantGroup.prototype.addHydrant = function(x,y){
   this.hydrant = new Hydrant(this.game,x,y,this.player);
   this.add(this.hydrant);
};
