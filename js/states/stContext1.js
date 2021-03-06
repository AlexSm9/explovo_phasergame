// Context for starting the game -> level 1
var stContext1 = function(game) {
};
stContext1.prototype = {
    preload: function(){
        l("Context1_preload");
        this.game.stage.backgroundColor = "#000000";
        // add in background
        
    },//end_preload
    create: function(){
       l("Context1_create");
       this.sfx= this.game.add.audio("whirling");
       this.swish = this.game.add.audio('swish');

       this.sfx.play('',0,.2,false);
       this.swish.play('', 0, .5, false);
        
       // mute this.sfx
       if (isMute === true) {
           this.sfx.volume = 0;
       }

        this.news = this.game.add.image(this.game.width/2, this.game.height/2, 'News1');
        this.news.anchor.set(0.5,0.5);
        this.news.scale.setTo(0.1,0.1);

        this.game.add.tween(this.news).to( { angle: 720 }, 900, Phaser.Easing.Linear.None, true);
        this.game.add.tween(this.news.scale).to( { x: 1, y: 1 }, 1200, Phaser.Easing.Linear.None, true);

        // add in button
        this.button = this.game.add.button(this.game.width/2, this.game.height - 120, 'NextButtons', this.startGame, this.game,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.4,0.4);
        
    },//end_create
    startGame: function() {
		this.state.start("stGame");
    }//end_startGame
};
