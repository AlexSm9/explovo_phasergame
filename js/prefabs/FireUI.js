// Fire UI - incomplete
// Should take sum of all building HP and scale fire bar to it
var FireUI = function(game, buildings, x, y){
	// initialize variables
	this.total = 0;
	this.fires = 0;
	

	// create UI and fix to camera
	this.counter= game.add.image(700,50,'fireCount');
	this.counter.anchor.set(0.5,0.5);
	this.counter.scale.setTo(0.5,0.5);
	this.counter.fixedToCamera=true;
	//this.count = game.add.text(740,35, 'X ' + this.fires,{fontSize: '25px',fill:'yellow'});
	//this.count.fixedToCamera=true;
   	//this.add.text(500, 50, 'X', {fontSize: '15px', fill: 'white'});

	this.uiInner = game.add.image(x,y,'FireLevel');
	this.uiInner.anchor.set(0.5,1);
	this.uiInner.fixedToCamera = true;
	this.uiInner.cameraOffset.setTo(x,y);
	
	this.uiOuter = game.add.image(x-41,y-285,'FireBar');
	this.uiOuter.fixedToCamera = true;
	this.uiOuter.cameraOffset.setTo(x-41,y-285);
	
	// create scaling factor
	this.buildingTotals = buildings; // save building group
	this.buildingTotals.forEach(function(building){  // get total health for the fire bar
		this.total += building.health;
	},this); // start both values at full
	l(this.total);
	this.current = this.total; 
	this.uiInner.scale.y = this.current / this.total;
};

FireUI.prototype = Object.create(Phaser.Sprite.prototype);
FireUI.prototype.constructor = FireUI; // creation call

FireUI.prototype.update = function(){
	this.buildingTotals.forEach(function(fireDamage){
		this.current -= fireDamage.fireCount*0.1;
	},this);
	this.uiInner.scale.y = this.current/this.total;
};