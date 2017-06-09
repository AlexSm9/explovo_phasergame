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
       
       // add in animated title background
       this.TitleAnimation = this.game.add.sprite(0,0,'TitleAnimation');
       this.TitleAnimation.animations.add('TitleAnimation');
       this.TitleAnimation.animations.play('TitleAnimation', 24, true);
        
       // add in title text
       this.add.image(0, -20, 'titleText');

        this.button = this.game.add.button(this.game.width/2, this.game.height - 186, 'StartButtons', this.startGame, this.game, 'riotfighter title button2 w shadow', 'riotfighter title button w shadow');
        this.button.anchor.set(0.5);
        
        this.button.onInputUp.add(this.stopMusic, this);
        
        // add and play music
        this.title_music = this.game.add.audio('title_screen');
        this.title_music.play('', 0, 1, true);
        
    },//end_create
    stopMusic: function() {
        this.title_music.stop();
    },
    startGame: function() {


    this.state.start("stContext1");


    }//end_startGame
};
