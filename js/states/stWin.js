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


        this.titleButton = this.game.add.button(130, this.game.height - 75, 'TitleScreenButtons', this.startGame, this.game,'titleScreenButtonOver', 'titleScreenButton');
        this.titleButton.anchor.set(0.5);
        this.titleButton.scale.setTo(0.8);
        
        this.button = this.game.add.button(this.game.width - 110, this.game.height - 50, 'NextButtons', this.startGame, this.game,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.35);
        this.button.onInputUp.add(this.stopSound, this);

    },//end_create
    stopSound: function() {
        
    },//end_stopSound
    startGame: function() {
        this.state.start("stTitle");
    }//end_startGame
};
