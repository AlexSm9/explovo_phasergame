//logging functionality
function l(itemToLog){
if(true){
      if(typeof(itemToLog)==Object){
         console.log(JSON.stringify(itemToLog));
      }else{
         console.log(itemToLog);
      }
   }
}

function normalize(x, y){
   if(x!==0 && y!==0){
      pointMagnitude = Math.sqrt((x*x)+(y*y));
      return {x: (x/pointMagnitude), y: (y/pointMagnitude)};
   }else{
      return {x: 0, y: 0};
   }
}

function randInt(max, min){
   min = typeof min !== 'undefined' ? min : 0;
   return Math.floor(Math.random() * (max - min)) + min;
}

//calculates rotational transformation of X and Y spaces away from rotational origin (0, 0)
function transformOverAngle(angleInRadians, x, y){
   cosine = Math.cos(angleInRadians);
   sine = Math.sin(angleInRadians);
   xprime = (cosine*x)+(-1*(sine*y));
   yprime = (sine*x)+(cosine*y);
   var returnObj = {x: xprime, y: yprime};
   return returnObj;
}

//calculates distance between 2 points by pythagorean distance formula
function distanceBetween(x1, y1, x2, y2){
   return Math.sqrt(Math.pow(x1-x2, 2)+Math.pow(y1-y2, 2));
}

//timer functionality
function UtilTime(phaserGameObject){
   this.gameTime = game.time;
   this.initTime = this.gameTime.totalElapsedSeconds();
   this.lapList = [];
}
UtilTime.prototype.constructor = UtilTime;
UtilTime.prototype.resetTime = function(){
   this.initTime = this.gameTime.totalElapsedSeconds();
   this.lapList = [];
};
UtilTime.prototype.seconds = function(){
   return (this.gameTime.totalElapsedSeconds()-this.initTime);
};
UtilTime.prototype.milisecs = function(){
   return 1000*(this.gameTime.totalElapsedSeconds()-this.initTime);
};
UtilTime.prototype.lap = function(){
   this.lapList.push(this.gameTime.totalElapsedSeconds()-this.initTime);
};
UtilTime.prototype.getLapTimes = function(){
   return this.lapList;
};
UtilTime.prototype.getLap = function(lapIndex){
   return this.lapList[lapIndex];
};
UtilTime.prototype.clearLaps = function(lapIndex){
    this.lapList = [];
};

//keyboard manager
function KeyManager(phaserGameObject){
   this.keyboard = phaserGameObject.input.keyboard;
   this.keyList = [];
}
KeyManager.prototype.constructor = KeyManager;
KeyManager.prototype.addKey = function(phaserKeyCode){
   var key = {code: Phaser.KeyCode[phaserKeyCode], isDown: false, isPressed: false, isReleased: false, lastState:  1};
   this.keyList.push(key);
};
KeyManager.prototype.removeKey = function(phaserKeyCode){
   this.keyList.splice(this.keyList.indexOf(this.keyList.find(function(keyElement){
      return (keyElement.code == Phaser.KeyCode[phaserKeyCode]);
   }, this)), 1);
};
KeyManager.prototype.isDown = function(phaserKeyCode){
   //l("KeyManager's isDown called");
   key = this.keyList.find(function(keyElement){
      return (keyElement.code == Phaser.KeyCode[phaserKeyCode]);
   }, this);
   return key.isDown;
};
KeyManager.prototype.isPressed = function(phaserKeyCode){
   key = this.keyList.find(function(keyElement){
      return (keyElement.code == Phaser.KeyCode[phaserKeyCode]);
   }, this);
   return key.isPressed;
};
KeyManager.prototype.isReleased = function(phaserKeyCode){
   key = this.keyList.find(function(keyElement){
      return (keyElement.code == Phaser.KeyCode[phaserKeyCode]);
   }, this);
   return key.isReleased;
};
KeyManager.prototype.update = function(){

   var keyboard = this.keyboard;

   // 1: key not pressed (default), 2: key just pressed, 3: key pressed down, 4: key just released
   this.keyList.forEach(function(key){
      key.isDown = keyboard.isDown(key.code);
      if(key.isDown){
         if(key.lastState == 1 || key.lastState == 4){
            key.isDown = false;
            key.isPressed = true;
            key.isReleased = false;
            key.lastState = 2;
         }else if(key.lastState == 2){
            key.isPressed = false;
            key.lastState = 3;
         }
      }else{ //key is down
         if(key.lastState == 3 || key.lastState == 2){
            key.isDown = true;
            key.isPressed = false;
            key.isReleased = true;
            key.lastState = 4;
         }else if(key.lastState == 4){
            key.isReleased = false;
            key.lastState = 1;
         }
      }
   });
};
