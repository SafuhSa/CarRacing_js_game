const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

var mouseX = 0;
var mouseY = 0;


class Input {
  constructor(canvas, blueCar, greenCar) {
    this.canvas = canvas;
    this.blueCar = blueCar;
    this.greenCar = greenCar;
  }

  setupInput() {
    // console.log(this.canvas)
    this.canvas.addEventListener("mousemove", this.updateMousePos.bind(this));

    document.addEventListener("keydown", this.keyPressed.bind(this));
    document.addEventListener("keyup", this.keyReleased.bind(this));

    this.greenCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
    this.blueCar.setupInput(
      KEY_UP_ARROW,
      KEY_RIGHT_ARROW,
      KEY_DOWN_ARROW,
      KEY_LEFT_ARROW
    );
  }

  updateMousePos(evt) {
    var rect = this.canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    // cheat / hack to test car in any position
    /*carX = mouseX;
    carY = mouseY;
    carSpeedX = 4;
    carSpeedY = -4;*/
  }

  keySet(keyEvent, whichCar, setTo) {
    // console.log( whichCar, setTo);
    if (keyEvent.keyCode == whichCar.controlKeyLeft) {
      whichCar.keyHeld_TurnLeft = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlKeyRight) {
      whichCar.keyHeld_TurnRight = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlKeyUp) {
      whichCar.keyHeld_Gas = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlKeyDown) {
      whichCar.keyHeld_Reverse = setTo;
    }
  }

  keyPressed(evt) {
    // console.log("dasv", this.blueCar.keyHeld_Reverse);
    evt.preventDefault();
    this.keySet(evt, this.greenCar, true);
    this.keySet(evt, this.blueCar, true);
    // console.log("dasv", this.blueCar.keyHeld_Reverse);
  }

  keyReleased(evt) {
    // console.log("Key pressed: "+evt.keyCode);
    this.keySet(evt, this.greenCar, false);
    this.keySet(evt, this.blueCar, false);
  }
}

module.exports = Input;