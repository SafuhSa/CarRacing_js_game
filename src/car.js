const LevelMaps = require("./level_maps");
const GraphicsCommon = require('./graphics_common');
const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

class Car {
  constructor(ctx, track) {
    this.ctx = ctx;
    this.x = 75;
    this.y = 75;
    this.ang = 0;
    this.speed = 0;
    this.track = track;
    this.myCarPic; // which picture to use
    this.name = "Untitled Car";
  
    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;
  
    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;

    this.reset = this.reset.bind(this);
  }

  setupInput(upKey, rightKey, downKey, leftKey) {
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyDown = downKey;
    this.controlKeyLeft = leftKey;
  };

  reset(whichImage, carName) {
    this.name = carName;
    this.myCarPic = whichImage;
    this.speed = 0;

    for (var eachRow = 0; eachRow < LevelMaps.ROWS; eachRow++) {
      for (var eachCol = 0; eachCol < LevelMaps.COLS; eachCol++) {
        var arrayIndex = this.track.rowColToArrayIndex(eachCol, eachRow);
        if (this.track.trackGrid[arrayIndex] == LevelMaps.PLAYERSTART) {
          this.track.trackGrid[arrayIndex] = LevelMaps.ROAD;
          this.ang = -Math.PI / 2;
          this.x = eachCol * LevelMaps.W + LevelMaps.W / 2;
          this.y = eachRow * LevelMaps.H + LevelMaps.H / 2;
          return;
        } // end of player start if
      } // end of col for
    } // end of row for
    console.log("NO PLAYER START FOUND!");
  }; // end of carReset func

  move() {
    this.speed *= GROUNDSPEED_DECAY_MULT;
    if (this.keyHeld_Gas) {
      this.speed += DRIVE_POWER;
    }
    if (this.keyHeld_Reverse) {
      this.speed -= REVERSE_POWER;
    }
    if (Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
      if (this.keyHeld_TurnLeft) {
        this.ang -= TURN_RATE;
      }
      if (this.keyHeld_TurnRight) {
        this.ang += TURN_RATE;
      }
    }

    this.x += Math.cos(this.ang) * this.speed;
    this.y += Math.sin(this.ang) * this.speed;

    this.track.carTrackHandling(this);
  };

  draw() {
    GraphicsCommon.drawBitmapCenteredWithRotation(
      this.ctx,
      this.myCarPic,
      this.x,
      this.y,
      this.ang
    );
  };
}

module.exports = Car;
