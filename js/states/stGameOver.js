//Instructions Page

var stGameOver = function(game) {
};
stGameOver.prototype = {
    preload: function(){
        l("Directions_preload");
        // add in background
        this.game.add.image(0, 0, 'GameOverPage');

    },//end_preload
    create: function(){
        game.sound.stopAll();
       l("Directions_create");
        
        this.game.stage.backgroundColor = "#000000";
        
        // add sound
        this.fire_sound = this.game.add.audio('fire');
        this.fire_sound.play('', 0, .3, true);
        
        // add in start button
        this.add.text(315, this.game.height-500, 'You failed to save the city!', {fontSize: '15px', fill: 'white'});
        this.add.text(280, this.game.height-450, 'Hopefully next time you can succeed.', {fontSize: '15px', fill: 'white'});
        this.add.text(325, this.game.height-400, 'Do you want to try again?', {fontSize: '15px', fill: 'white'});
        this.add.text(350, this.game.height-350, 'Restart!', {fontSize: '25px', fill: 'white'});
        
        //Add restart button
        this.button = this.game.add.button(this.game.width/2, this.game.height - 230, 'NextButtons', this.startGame, this.game,'ContinueButtonOver', 'ContinueButton');
        this.button.anchor.set(0.5);
        this.button.scale.setTo(0.4,0.4);
        this.button.onInputUp.add(this.stopSound, this);
        
        this.add.text(380, this.game.height - 150, 'Or...', {fontSize: '20px', fill: 'white'});
        
        // Add title screen button
        this.titleButton = this.game.add.button(this.game.width/2, this.game.height - 80, 'TitleScreenButtons', this.titleScreen, this.game, 'titleScreenButtonOver', 'titleScreenButton');
        this.titleButton.anchor.set(0.5);
        this.titleButton.scale.setTo(0.7);
        this.titleButton.onInputUp.add(this.stopSound, this);

    },//end_create
    over: function() {
        l("over");

    },//end_over
    out: function() {
        l("out");

    },//end_out
    stopSound: function() {
        this.fire_sound.stop();
        
    },//end_stopMusic
    startGame: function() {
        console.log(this.state.previousState)
        this.state.start(this.state.previousState);
    },//end_startGame
    titleScreen: function() {
        this.state.start("stTitle");
    },//end_titleScreen
};
