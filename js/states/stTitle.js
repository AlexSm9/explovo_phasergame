// Title state
// Title screen
var stTitle = function(game) {
};
stTitle.prototype = {
    preload: function(){
        l("title_preload");
        // add in background
        this.game.add.image(0, 0, 'TitleScreen');
        
    },//end_preload
    create: function(){
        l("title_create");
        // add in start button 
        var button = this.game.add.button(this.game.width/2, this.game.height - 186, 'StartButtons', this.startGame, this.game, 'riotfighter-title-button2', 'riotfighter-title-button');
        button.anchor.set(0.5);
        
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

        this.state.start("stContext1");

    }//end_startGame
};
