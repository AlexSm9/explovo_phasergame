//Instructions Page

var stWin = function(game) {
};
stWin.prototype = {
    preload: function(){
        l("Directions_preload");
        // add in background
        this.game.add.image(10, 0, 'Win');

    },//end_preload
    create: function(){
        this.sound.stopAll();
       l("Directions_create");

        // add audio
        this.bg_music = this.game.add.audio('win');
        this.bg_music.play('', 0, .7, false);
        this.bg_sounds = this.game.add.audio('win_sounds');
        this.bg_sounds.play('', 0, .7, true);
        
        if (isMute === true) {
            this.bg_music.volume = 0;
        }
        
        this.titleButton = this.game.add.button(130, this.game.height - 75, 'TitleScreenButtons', this.titleScreen, this.game,'titleScreenButtonOver', 'titleScreenButton');
        this.titleButton.anchor.set(0.5);
        this.titleButton.scale.setTo(0.8);
        this.titleButton.onInputUp.add(this.stopSound, this);
        

    },//end_create
    stopSound: function() {
        this.bg_music.stop();
        this.bg_sounds.stop();
    },//end_stopSound
    titleScreen: function() {
        this.state.start("stTitle");
    }//end_titleScreen
};
