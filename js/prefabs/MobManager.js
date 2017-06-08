function MobManager(defaultCohesionDistance, defaultSeparationDistance, defaultHeadingDistance, defaultCohesionWeight, defaultSeparationWeight, defaultHeadingWeight){
   this.mobList = [];
   this.RM = null;
   this.defaultCohesionDistance = defaultCohesionDistance;
   this.defaultSeparationDistance = defaultSeparationDistance;
   this.defaultHeadingDistance = defaultHeadingDistance;
   this.defaultCohesionWeight = defaultCohesionWeight;
   this.defaultSeparationWeight = defaultSeparationWeight;
   this.defaultHeadingWeight = defaultHeadingWeight;

   // enable collisions between members of this MobManager. This should rarely, if ever, be changed during runtime
   this.doCollideMobs = true;

   this.creationTime = (new Date()).getTime();

   this.events = [];

   this.killOffscreen = false;

}
MobManager.prototype.constructor = MobManager;
// adds an already existing mob to MobManager
MobManager.prototype.addMob = function(mob){
   if(mob.cohesionDistance === null){
      mob.cohesionDistance = this.defaultCohesionDistance;
   }
   if(mob.separationDistance === null){
      mob.separationDistance = this.defaultSeparationDistance;
   }
   if(mob.headingDistance === null){
      mob.headingDistance = this.defaultHeadingDistance;
   }
   if(mob.cohesionWeight === null){
      mob.cohesionWeight = this.defaultCohesionWeight;
   }
   if(mob.separationWeight === null){
      mob.separationWeight = this.defaultSeparationWeight;
   }
   if(mob.headingWeight === null){
      mob.headingWeight = this.defaultHeadingWeight;
   }
   /* If we ever get around to implementation give each mob a short random ID
   if(mob.id === null){
      mob.id = genID();
   }*/
   this.mobList.push(mob);
};
// removes a mob passed into arguments, if it exists
MobManager.prototype.removeMob = function(mobToRemove){
   for(var x=mobList.length-1; x>=0; x--){ //from back to front, array is reindexed on removal due to destroy
      mob = mobList[x];
      if(mob == mobToRemove){
         mob.destroy();
         this.mobList.splice(x, 1);
      }
   }
};
// destroys all mobs within this MobManager
MobManager.prototype.killAll = function(mobToRemove){
   mobList = this.mobList;
   for(var x in mobList){
      mob = mobList[x];
      mob.destroy();
   }
   mobList = [];
};
// destroys the MobManager
MobManager.prototype.killThis = function(mobToRemove){
   this.destroy();
};
// sets the goal of all mobs within the manager to arguments. Impact on framerate possible with large numbers of mobs if called in update
MobManager.prototype.setAllGoal = function(goalX, goalY, goalWeight){
   this.mobList.forEach(function(mob){
      mob.setGoalPoint(goalX, goalY, goalWeight);
   });
};

MobManager.prototype.setAllBuilding = function(building){
   this.mobList.forEach(function(mob){
      mob.setOwnBuilding(building);
   });
};

// kills all mobs out of view of the camera, assumes anchor is at center
MobManager.prototype.killAllOutOfView = function(game){ // kills only mobs with killOffscreen set to true
   cameraX = game.camera.x;
   cameraY = game.camera.y;
   cameraW = game.camera.width;
   cameraH = game.camera.height;
   mobList = this.mobList;
   for(var x=mobList.length-1; x>=0; x--){ //from back to front, array is reindexed on removal due to destroy
      mob = mobList[x];
      //assumption: sprite's anchor is 0.5, 0.5
      if(mob.killOffscreen === true){
         if(((mob.x + mob.spriteDiagonal/2)<cameraX) || ((mob.x - mob.spriteDiagonal/2)>(cameraX+cameraW)) || ((mob.y + mob.spriteDiagonal/2)<cameraY) || ((mob.y - mob.spriteDiagonal/2)>(cameraY+cameraH))){
               mob.destroy();
               this.mobList.splice(x, 1);
         }
      }
   }
};

// to each mob add a callback that occurs if it enters the area defined by the other parameters
MobManager.prototype.addAllTriggerOnEntry = function(leftCornerX, leftCornerY, width, height, callback){
   this.mobList.forEach(function(mob){
      mob.triggerOnEntry(leftCornerX, leftCornerY, width, height, callback);
   });
};
// to each mob add a callback that occurs if it collides with the object passed by parameter
MobManager.prototype.addAllTriggerOnCollision = function(objectToCollideWith, callback, booleanIsEfficient){
   /*
   booleanIsEfficient maintains efficiency by only checking for collisions if objectToCollideWith
   is close to each mob. For something like an emitter which has collisions checked by
   referencing the emitter itself, rather than a particle, this produces unwanted behavior and
   must implement collisions without checking distance prior.
   */
   this.mobList.forEach(function(mob){
      mob.triggerOnCollision(objectToCollideWith, callback, booleanIsEfficient);
   });
};

// update method for MobManager, since this is not a phaser object, this method MUST be called within the update loop of its state
MobManager.prototype.update = function(game){
   //include MobManager as parameter to callback
   time = (new Date()).getTime();
   createTime = this.creationTime;
   for(var x=this.events.length-1; x>=0; x--){
      event = this.events[x];
      if(time > createTime + event.millisecs){
         event.cb(this);
         this.events.splice(x, 1);
      }
   }

   if(this.killOffscreen === true){
      this.killAllOutOfView(game);
   }

   var mobList = this.mobList;
   doCollideMobs = this.doCollideMobs;

   mobList.forEach(function(mob){
      //game.debug.body(mob);

      updateFlocking(mob, getNeighbors(mob, mobList));
      //update loop n^2 runtime individual mob check
      if(doCollideMobs){
         mobList.forEach(function(checkedMob){
            if(distanceBetween(mob.x, mob.y, checkedMob.x, checkedMob.y)<Math.max(mob.spriteDiagonal, checkedMob.spriteDiagonal)){
               game.physics.arcade.collide(mob, checkedMob);
            }
         });
      }
   });

   //--/ functions used for update loop above

   function getNeighbors(sourceMob, mobList){
      cDist = sourceMob.cohesionDistance;
      sDist = sourceMob.separationDistance;
      hDist = sourceMob.headingDistance;

      cohesionNeighbors = [];
      separationNeighbors = [];
      headingNeighbors = [];

      for(var x in mobList){
         mob = mobList[x];
         if(mob!=sourceMob){ //prevents addition of self to neighbor group
            dist = distanceBetween(mob.x, mob.y, sourceMob.x, sourceMob.y);
            if(dist <= cDist){
               cohesionNeighbors.push(mob);
            }
            if(dist <= sDist){
               separationNeighbors.push(mob);
            }
            if(dist <= hDist){
               headingNeighbors.push(mob);
            }
         }
      }
      return{cN: cohesionNeighbors, sN: separationNeighbors, hN: headingNeighbors};
   }

   function updateFlocking(mob, neighbors){
      if(neighbors.cN.length>0){
   }

      calcHeading = averageHeading(mob, neighbors.hN);
      calcCohesion = averageCohesion(mob, neighbors.cN);
      calcSepraration = averageSeparation(mob, neighbors.sN);

      newVectorX = calcCohesion.cX*mob.cohesionWeight + calcSepraration.sX*mob.separationWeight + calcHeading.hX*mob.headingWeight;
      newVectorY = calcCohesion.cY*mob.cohesionWeight + calcSepraration.sY*mob.separationWeight + calcHeading.hY*mob.headingWeight;

      combinedVector = normalize(newVectorX, newVectorY);
      mob.setFlockingVector(combinedVector.x, combinedVector.y);



      function averageHeading(mob, headingNeighbors){
         if(headingNeighbors.length<=0){ //doublecheck
            return {hX: 0, hY: 0};
         }
         headingPointX = 0;
         headingPointY = 0;
         headingNeighbors.forEach(function(neighbor){
            neighborVelocities = neighbor.getVelocities();
            headingPointX += (neighborVelocities.x);
            headingPointY += (neighborVelocities.y);
         });
         headingPointX /= headingNeighbors.length;
         headingPointY /= headingNeighbors.length;
         headingPoint = normalize(headingPointX, headingPointY);
         return {hX: headingPoint.x, hY: headingPoint.y};
      }
      function averageCohesion(mob, cohesionNeighbors){
         cPositionX = 0;
         cPositionY = 0;
         if(cohesionNeighbors.length<=0){
            return {cX: 0, cY: 0};
         }
         cohesionNeighbors.forEach(function(neighbor){
            cPositionX += (neighbor.x - mob.x);
            cPositionY += (neighbor.y - mob.y);
         });
         cPositionX /= cohesionNeighbors.length;
         cPositionY /= cohesionNeighbors.length;
         cohesionPoint = normalize(cPositionX, cPositionY);
         return {cX: cohesionPoint.x, cY: cohesionPoint.y};
      }
      function averageSeparation(mob, separationNeighbors){
         sPositionX = 0;
         sPositionY = 0;
         if(separationNeighbors.length<=0){
            return {sX: 0, sY: 0};
         }
         separationNeighbors.forEach(function(neighbor){
            sPositionX = sPositionX+ (neighbor.x - mob.x);
            sPositionY = sPositionY +  (neighbor.y - mob.y);
         });
         sPositionX /= separationNeighbors.length;
         sPositionY /= separationNeighbors.length;
         sPositionX *= -1;
         sPositionY *= -1;
         separationPoint = normalize(sPositionX, sPositionY);
         return {sX: separationPoint.x, sY: separationPoint.y};
      }

   }
};


//--/ functions not absolutely necessary for normal operation

// stops motion of mobs
MobManager.prototype.freezeAll = function(){
   this.mobList.forEach(function(mob){
      mob.freeze();
   });
};

MobManager.prototype.killOnEmpty = function(){
   if(this.mobList.length<=0){
      delete this;
   }
};

MobManager.prototype.addEvent = function(callbackForMobManager, elapsedSecondsAfterCallingThisFunction){
   this.events.push({millisecs: elapsedSecondsAfterCallingThisFunction*1000, cb: callbackForMobManager});
};

// returns a random array of mobs
MobManager.prototype.getRandomSubset = function(minQuantity, maxQuntity){
   maxQuantity = typeof maxQuantity !== 'undefined' ? maxQuantity : minQuantity;
   mobList = this.mobList;
   if(minQuantity >= mobList.length){
      return mobList;
   }
   if(maxQuantity > mobList.length){
      maxQuantity = mobList.length;
   }
   tempList = mobList.slice(mobList); // creates copy
   returnList = [];
   quantityToReturn = randInt(maxQuantity, minQuantity);
   for(i = 0; i<quantityToReturn; i++){
      randomlyChosenIndex = Math.floor(Math.random()*tempList.length);
      returnList.push(tempList.splice(randomlyChosenIndex, 1));
   }
   return returnList;
};

MobManager.prototype.positionAllOffscreenRandomly = function(game){
   mobList = this.mobList;
   for(var x=mobList.length-1; x>=0; x--){ //from back to front, array is reindexed on removal due to destroy


      mob = mobList[x];
      mob.positionOffscreenRandomly(game);
      /*
      leftX = game.camera.x - mob.spriteDiagonal;
      rightX = game.camera.x + game.camera.width + mob.spriteDiagonal;
      leftY = game.camera.y - mob.spriteDiagonal;
      rightY = game.camera.y + game.camera.height + mob.spriteDiagonal;


      // potentially does overlap, fix if time
      switch(randInt(0, 3)){
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
      }*/
   }
};
