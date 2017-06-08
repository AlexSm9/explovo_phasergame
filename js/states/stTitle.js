// Title state
// Title screen
var stTitle = function(game) {
};
stTitle.prototype = {
    preload: function(){
        l("title_preload");
        // add in background
        //this.game.add.image(0, 0, 'TitleScreen');
        
    },//end_preload
    create: function(){
        l("title_create");
        // add in start button 

       var TitleAnimation = this.game.add.sprite(0,0,'TitleAnimation');
       TitleAnimation.animations.add('TitleAnimation');
       TitleAnimation.animations.play('TitleAnimation', 24, true);

        var button = this.game.add.button(this.game.width/2, this.game.height - 186, 'StartButtons', this.startGame, this.game, 'riotfighter-title-button2', 'riotfighter-title-button');
        button.anchor.set(0.5);
        
        button.onInputOver.add(this.over, this);
        button.onInputOut.add(this.out, this);  
        button.onInputUp.add(this.stopMusic, this);
        
        // add and play music
        this.title_music = this.game.add.audio('title_screen');
        this.title_music.play('', 0, 1, true);
        
    },//end_create
    over: function() {
        l("over");

    },//end_over
    out: function() {
        l("out");
        
    },//end_out
    stopMusic: function() {
        this.title_music.stop();
    },
    startGame: function() {


    this.state.start("stContext1");


    }//end_startGame
};
