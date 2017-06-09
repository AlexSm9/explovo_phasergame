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
        // add in start button
        this.add.text(315, this.game.height-400, 'You failed to save the city!', {fontSize: '15px', fill: 'white'});
        this.add.text(280, this.game.height-350, 'Hopefully next time you can succeed.', {fontSize: '15px', fill: 'white'});
        this.add.text(325, this.game.height-300, 'Do you want to try again?', {fontSize: '15px', fill: 'white'});
        this.add.text(350, this.game.height-250, 'Restart!', {fontSize: '25px', fill: 'white'});


        var button = this.game.add.button(this.game.width/2, this.game.height - 120, 'NextButtons', this.startGame, this.game,'ContinueButtonOver', 'ContinueButton');
        button.anchor.set(0.5);
        button.scale.setTo(0.4,0.4);
        button.onInputOver.add(this.over, this);
        button.onInputOut.add(this.out, this);

    },//end_create
    over: function() {
        l("over");

    },//end_over
    out: function() {
        l("out");

    },//end_out
    startGame: function() {
        this.state.start("stGame");
    }//end_startGame
};
