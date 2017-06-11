// Title state
// Title screen
var isMute = false; //keeps track of whether or not music should be muted
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
        
       this.game.stage.backgroundColor = "#000000";
        
       // add and play music
       this.title_sounds = this.game.add.audio('title_sounds');
       this.title_sounds.play('', 0, .7, true);
       this.title_music = this.game.add.audio('title_screen');
       this.title_music.play('', 0, .7, true);
       
       // add in animated title background
       this.TitleAnimation = this.game.add.sprite(0,0,'TitleAnimation');
       this.TitleAnimation.animations.add('TitleAnimation');
       this.TitleAnimation.animations.play('TitleAnimation', 24, true);
        
       // add in title text
       this.add.image(0, -20, 'titleText');

       // add in start button
       this.button = this.game.add.button(this.game.width/2, this.game.height - 186, 'StartButtons', this.startGame, this, 'riotfighter title button2 w shadow', 'riotfighter title button w shadow');
       this.button.anchor.set(0.5);
       this.button.onInputUp.add(this.stopMusic, this);
        
       // add in music mute/unmute button
       this.musicButton = this.game.add.button(this.game.width - 40, this.game.height - 45, 'MusicButtons', this.muteMusic, this, 'music-button-on2', 'music-button-on');
       this.musicButton.anchor.set(0.5);
       this.musicButton.scale.setTo(0.4);
        
        
    },//end_create
    stopMusic: function() {
       this.title_music.stop();
       this.title_sounds.stop();
    },
    muteMusic: function() {
       //if music is mute, unmute. Else, mute it.
       isMute ? (isMute = false, this.title_music.mute = false) : (isMute = true, this.title_music.mute = true);

    },
    startGame: function() {
        
        
       this.state.start("stContext1");


    }//end_startGame
};
