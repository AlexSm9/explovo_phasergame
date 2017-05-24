// This is for the fire and water UI indicatiors

var game;
var Play;
var i=0;
var Waters;
var WaterLength=1.00;
//intial load

window.onload = function () {
	game = new Phaser.Game(1000,600,Phaser.AUTO);
	game.state.add('Load', Load);
	game.state.add('Play', Play);
	game.state.start('Load');
}
//load state for assets
var Load = function(game){};
Load.prototype = {
	preload: function (){
		//load images
		console.log('Load: preload');
		game.load.path = '../FinalProject/Assets/';
	this.load.image('WaterBar','CMPM120(WaterUI-257X84px).png');
	this.load.image('WaterLevel','CMPM120(WaterLevelUI197x35px).png')
	this.load.image('FireBar','(FireBar-81X360).png');
	this.load.image('FireLevel','(FireLevel-29X277).png');
		
	},
	create: function() {
		console.log('Play: create');	
		game.state.start('Play');
	},
	update: function(){
		
	}
};
//play function
var Play = function(game){};
Play.prototype = {
	preload: function (){
		console.log('Preload');
	},
	create: function (){

		    game.stage.backgroundColor = "#4488AA";
		
			console.log('play');
			
			// will concet to fire in city
			this.add.image(834,50,'FireBar');
			this.Fires = game.add.image(875,335,'FireLevel');
			this.Fires.anchor.set(0.5,1);
			//water bar // will conect to clicks
			this.Waters = game.add.image(70,60,'WaterLevel');	
			this.add.image(20,20,'WaterBar');
			this.Waters.anchor.set(0,0.5);

			//test input
			waterDrain = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
			waterRefill = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
			FireFall = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
			
		},
	update:function (){
		// will change to click test of concept of water bar
		if (waterDrain.isDown){
			this.Waters.scale.x -= 0.005;		
		}
		if(this.Waters.scale.x<0){
			this.Waters.scale.x=0;
		}	
	
		if(waterRefill.isDown){
			this.Waters.scale.x += 0.005;
		}
		if(this.Waters.scale.x>1){
			this.Waters.scale.x=1;
		}

		//scaling the fire level
		if (FireFall.isDown){
			this.Fires.scale.y -= 0.005;		
		}
		if(this.Fires.scale.y<0){
			this.Fires.scale.y=0;
			console.log('Gameover');
		}	

	
	}
};


    

   