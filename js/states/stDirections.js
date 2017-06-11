//Instructions Page

var stDirections = function(game) {
};
stDirections.prototype = {
    preload: function(){
        l("Directions_preload");
        // add in background
        this.game.add.image(0, 0, 'DirectPage');
        
    },//end_preload
    create: function(){
       l("Directions_create");
        
        // add audio
        this.bg_sounds = this.game.add.audio('riot_sounds');
        this.bg_sounds.play('', 0, 0.7, true);
        
        this.add.text(225, this.game.height-400, 'The city is in chaos, and it is up to you to protect it!', {fontSize: '15px', fill: 'white'});
        this.add.text(300, this.game.height-350, 'Use the WASD keys to move!', {fontSize: '15px', fill: 'white'});
        this.add.text(250, this.game.height-300, 'Use your mouse to direct and shoot water!', {fontSize: '15px', fill: 'white'});
        this.add.text(125, this.game.height-250, 'Put out as many fires as you can and use the fire hydrants to refill your water!', {fontSize: '15px', fill: 'white'});

        //add in buttons
        this.buttonTutorial = this.game.add.button(this.game.width/2, this.game.height - 120, 'NextButtons', this.startTutorial, this.game,'ContinueButtonOver', 'ContinueButton');
        this.buttonTutorial.anchor.set(0.5);
        this.buttonTutorial.scale.setTo(0.4,0.4);
        this.buttonTutorial.onInputUp.add(this.stopSound, this);
		
		this.add.text(this.game.width - 100, this.game.height - 100, 'Skip Tutorial', {fontSize: '15px', fill: 'white'});
		this.buttonSkip = this.game.add.button(this.game.width - 50, this.game.height - 50, 'NextButtons', this.skipTutorial, this.game,'ContinueButtonOver', 'ContinueButton');
		this.buttonSkip.anchor.set(0.5);
        this.buttonSkip.scale.setTo(0.2,0.2);
        this.buttonSkip.onInputUp.add(this.stopSound, this);
        
    },//end_create
    stopSound: function() {
        this.bg_sounds.stop();
        
    },//end_stopSound
    startTutorial: function() {

        this.state.start("stTutorialLevel");
      
    },//end_startTutorial
	skipTutorial: function() {

        this.state.start("stContext1");
      
    }//end_skipTutorial
};
