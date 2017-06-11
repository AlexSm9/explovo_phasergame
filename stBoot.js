// Boot state (preloader?)
// State for loading the game
var stBoot = function(game){
};
stBoot.prototype = {
	init: function(){
		l("boot_init");
		this.stage.disableVisibilityChange = true;
	},
	preload: function(){
		this.load.path="assets/img/";
	},
	create: function(){
      this.state.start("stPreloader");
	}
};