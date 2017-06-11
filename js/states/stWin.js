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
        // add in start button


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
        this.state.start("stTitle");
    }//end_startGame
};
