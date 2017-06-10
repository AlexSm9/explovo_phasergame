function Protester(game, spriteObject, positionX, positionY){
   Phaser.Sprite.call(this, game, positionX, positionY, spriteObject.key, spriteObject.frame);
   this.spriteDiagonal = distanceBetween(this.x, this.y, this.x+this.width, this.y+this.height); //do this before setting anchor
   this.anchor.set(0.5);
   game.physics.enable(this);
   this.body.setSize(this.width-4, this.height-4, 2, 2);

   game.add.existing(this);

   /*var result = "";
   chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
   for (var i = 10; i > 0; i--){
      randomChar = chars[Math.floor(Math.random() * chars.length)];
      result+=randomChar;
   }
   this.id = result;*/

   this.hasTurnedRioter = false;

   this.killNextFrame = false;
   this.killOffscreen = false;

   this.creationTime = (new Date()).getTime();
   this._events = [];

   // values which should be here but can be changed as required
   this.maxVelocity = 40;
   this.goalVectorWeightDefault = 0.4;
   this.spriteAngleOffset = Math.PI/2; //(sprite normally faces... up: -Math.PI/2, down: Math.pi/2, left: Math.PI, right: 0)
   this.rotationDefault = 0;

   //--/ can change but beware of possible buggy behavior
   // This value and the function that uses it prevents a situation between 2 sprites where
   //    cohesion and separation vectors are the only two influences on the mob and cause
   //    the mob's rotation to rapidly alternate between two polar opposites.
   this.minVelocityForRotationToVelocity = 5;

   // mob values, do not change
   this.cohesionWeight = null;
   this.cohesionDistance = null;
   this.separationWeight = null;
   this.separationDistance = null;
   this.headingWeight = null;
   this.headingDistance = null;
   this.flockingVector = {x: 0, y: 0};
   this.primaryGoalX = null;
   this.primaryGoalY = null;
   this.goalVectorWeight = null;
   this.headToGoal = false;
   this.lastFrameRotation = this.rotationDefault;
   // move according to the rules of MobManager
   this.naturalMove = true;

   // used to store function callbacks
   this.triggerEvents = [];
   this.collideEvents = [];
}
// Protester is a Sprite, its constructor is above
Protester.prototype = Object.create(Phaser.Sprite.prototype);
Protester.prototype.constructor = Protester;

//--/ The Following functions are used by MobManager to manage mobs, do not remove
Protester.prototype.setFlockingVector = function(xFlocking, yFlocking){
   this.flockingVector.x = xFlocking;
   this.flockingVector.y = yFlocking;
};
// can call seerately from Mob Manager to individually set goals for sprites
Protester.prototype.setGoalPoint = function(x, y, goalWeight){
   if(x=="undefined" || y=="undefined"){
      this.headToGoal = false;
   }else{
      this.headToGoal = true;
      this.primaryGoalX = x;
      this.primaryGoalY = y;
   }
   this.goalVectorWeight = typeof goalWeight !== 'undefined' ? goalWeight : this.goalVectorWeightDefault;
};
// returns a object containing the velocites of the mob
Protester.prototype.getVelocities = function(){
   return {x: this.body.velocity.x, y: this.body.velocity.y};
};
Protester.prototype.triggerOnEntry = function(leftCornerX, leftCornerY, width, height, callbackFunction){
   this.triggerEvents.push({leftX: leftCornerX, rightX: (leftCornerX+width), upY: leftCornerY, downY: (leftCornerY+height), cb: callbackFunction});
};
Protester.prototype.triggerOnCollision = function(objectToCollideWith, callbackFunction, booleanIsEfficient){
   this.collideEvents.push({collideWith: objectToCollideWith, cb: callbackFunction, efficient: booleanIsEfficient});
};
Protester.prototype.reverseNatural = function(boolean){
   if(typeof(boolean)!="boolean"){
      this.reverseNatural = false;
   }else{
      this.reverseNatural = boolean;
   }
};
Protester.prototype.setFlockingWeights = function(cWeight, sWeight, hWeight){
   this.cohesionWeight = cWeight;
   this.separationWeight = sWeight;
   this.headingWeight = hWeight;
};
Protester.prototype.setFlockingDistances = function(cDist, sDist, hDist){
   this.cohesionDistance = cDist;
   this.separationDistance = sDist;
   this.headingDistance = hDist;
};
Protester.prototype.update = function(){

   time = (new Date()).getTime();
   for(var w=this._events.length-1; w>=0; w--){
      event = this._events[w];
      if(time > this.creationTime + event.millisecs){
         event.cb(this);
         this._events.splice(w, 1);
      }
   }

   velX = this.body.velocity.x;
   velY = this.body.velocity.y;

   if(this.naturalMove === true){
      if(this.headToGoal === true){
         goalVectorX = this.primaryGoalX-this.x;
         goalVectorY = this.primaryGoalY-this.y;
         goal = normalize(goalVectorX, goalVectorY);
         normal = normalize((this.flockingVector.x+(this.goalVectorWeight*goal.x)),(this.flockingVector.y+(this.goalVectorWeight*goal.y)));
         velocityVectorX = normal.x;
         velocityVectorY = normal.y;
      }else{
         velocityVectorX = this.flockingVector.x;
         velocityVectorY = this.flockingVector.y;
      }
      velX += velocityVectorX;
      velY += velocityVectorY;
      velocityHyp = Math.sqrt((velX*velX)+(velY*velY));
      if(velocityHyp > this.maxVelocity){
         similarTriangleProportion = this.maxVelocity/velocityHyp;
         velX*=similarTriangleProportion;
         velY*=similarTriangleProportion;
      }
      if(this.reverseNatural === true){
         this.body.velocity.x = (-1*velX);
         this.body.velocity.y = (-1*velY);
      }else{
         this.body.velocity.x = velX;
         this.body.velocity.y = velY;
      }

      // rotates sprite to face direction of velocity
      if(this.headToGoal === false){
         if(Math.abs(this.body.velocity.x) <= this.minVelocityForRotationToVelocity && Math.abs(this.body.velocity.y) <= this.minVelocityForRotationToVelocity){
            this.rotation = this.lastFrameRotation;
         }else{
            this.rotation = this.lastFrameRotation = this.game.physics.arcade.angleToXY(this, (this.x + velX), (this.y + velY))-this.spriteAngleOffset;
         }
      }else{
         this.rotation = this.game.physics.arcade.angleToXY(this, (this.x + velX), (this.y + velY))-this.spriteAngleOffset;
      }
   }else{
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
   }

   // perform callbacks for enttry and collision _events
   for(var x = this.triggerEvents.length-1; x>=0; x--){
      event = this.triggerEvents[x];
      if(this.x>event.leftX && this.x<event.rightX){
         if(this.y>event.upY && this.y<event.downY){
            event.cb(this); //calls callback and passes mob in as parameter
            this.triggerEvents.splice(x, 1); // splices event as soon as complete
         }
      }
   }

   for(var y in this.collideEvents){
      event = this.collideEvents[y];
      if(event.efficient === false){
         this.game.physics.arcade.collide(this, event.collideWith, event.cb);
      }else{
         if(distanceBetween(this.x, this.y, event.collideWith.x, event.collideWith.y)<Math.max(this.spriteDiagonal, Math.sqrt(Math.pow(event.collideWith.width, 2)+Math.pow(event.collideWith.height, 2)))){
            this.game.physics.arcade.collide(this, event.collideWith, event.cb);
         }
      }
   }

   if(this.killNextFrame){
      this.destroy();
   }


};

//--/ functions not absolutely necessary for normal operation, do not call in MobManager if removed

Protester.prototype.freeze = function(boolean){
   this.naturalMove = false;
   if(boolean === false){
      this.naturalMove = true;
   }
};

Protester.prototype.addEvent = function(callbackForMobManager, elapsedSecondsAfterCallingThisFunction){
   this._events.push({millisecs: elapsedSecondsAfterCallingThisFunction*1000, cb: callbackForMobManager});
};

Protester.prototype.positionOffscreenRandomly = function(game){
   leftX = game.camera.x - this.spriteDiagonal;
   rightX = game.camera.x + game.camera.width + this.spriteDiagonal;
   leftY = game.camera.y - this.spriteDiagonal;
   rightY = game.camera.y + game.camera.height + this.spriteDiagonal;
   switch(randInt(3, 0)){
      case 0:
         this.x = leftX;
         this.y = randInt(leftY, rightY);
         break;
      case 1:
         this.x = rightX;
         this.y = randInt(leftY, rightY);
         break;
      case 2:
         this.x = randInt(leftX, rightX);
         this.y = leftY;
         break;
      case 3:
         this.x = randInt(leftX, rightX);
         this.y = rightY;
   }
};

Protester.prototype.positionOffworldRandomly = function(game){
   var point = randomPointOffscreen;
   this.x = point.x;
   this.y = point.y;
};

Protester.prototype.becomeRioter = function(game, spriteObject, building, RioterManager, ProtesterManager, collisionArray, eventArray){
   if(this.hasTurnedRioter === false){
      this.hasTurnedRioter = true;
      var protester = this;
      var rioter = new Rioter(game, {key: 'assets', frame: 'rioter'}, protester.x, protester.y);
      //var rioter = new Rioter(game, {key: 'assets', frame: 'rioter'}, 20, 20); // TEST CODE


      var throwAtBuilding = function(mob){
         //mob.freeze();
         mob.fireAtOwnBuilding(game);
         mob.setGoalPoint(game.world.centerX, game.world.centerY, 0.5);
         //tObject = new ThrownObject(game, {key: "moltav", frame: 0}, mob.centerX, mob.centerY);
      };

      rioter.body.velocity.x = protester.body.velocity.x;
      rioter.body.velocity.y = protester.body.velocity.y;
      rioter.setOwnBuilding(building);
      rioter.setGoalPoint(building.centerX, building.centerY, 0.4);
      /*rioter.addEvent(setGoalOffscreen, 40); // 40 seconds after creation, set goal of rioter to offscreen
      rioter.addEvent(setGoalOffscreen, 60); // 60 seconds after creation, set goal of rioter to offscreen, goal to prevent stuck state
      rioter.addEvent(setGoalOffscreen, 100); // 100 seconds after creation, set goal of rioter to offscreen, goal to prevent stuck state
      */

      for(var q = 0; q<eventArray.length; q++){
         rioter.addEvent(eventArray[q].cb, eventArray[q].time); // 40 seconds after creation, set goal of rioter to offscreen
      }

      rioter.triggerOnEntry(building.x-(building.width/2)-60, building.y - (building.height/2)- 60, building.width+120, building.height + 120, throwAtBuilding);

      for(var z = 0; z<collisionArray.length; z++){
         callback = typeof collisionArray[z].cb !== 'undefined' ? collisionArray[z].cb : null;
         rioter.triggerOnCollision(collisionArray[z].with, callback, false);
      }

      rioter.maxVelocity = 100;

      protester.killNextFrame = true;

      ProtesterManager.removeAndDestroyMob(protester);
      RioterManager.addMob(rioter);
   }

};
