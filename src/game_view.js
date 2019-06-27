const GraphicCommon = require('./graphics_common');
const ImgLoading = require('./img_loading');
const Track = require('./track');

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.levelNow = 0;
    this.track = new Track()
  }

  loadGame() {
    GraphicCommon.colorRect(this.ctx, 0, 0, GameView.WIDTH, GameView.HEIGHT, 'black');
    GraphicCommon.colorText(this.ctx, "LOADING IMAGES", GameView.WIDTH / 2, GameView.HEIGHT / 2, 'white');
    new ImgLoading().loadImages();
  }

  imageLoadingDoneSoStartGame(trackPics) {
    this.track.trackPics = trackPics;
    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);

    setupInput();

    this.loadLevel(levelList[levelNow]);
  }

  nextLevel() {
    this.levelNow++;
    if (this.levelNow >= levelList.length) {
      this.levelNow = 0;
    }
    this.loadLevel(levelList[levelNow]);
  }

  loadLevel(whichLevel) {
    this.track.trackGrid = whichLevel.slice();
    greenCar.reset(otherCarPic, "Green Machine");
    blueCar.reset(carPic, "Blue Storm");
  }

  updateAll() {
    this.moveAll();
    this.drawAll();
  }

  moveAll() {
    blueCar.move();
    greenCar.move();
  }

  drawAll() {
    this.track.drawTracks(this.ctx);
    blueCar.draw();
    greenCar.draw();
  } 
  
  // start() {
  //   this.bindKeyHandlers();
  //   this.lastTime = 0;
  //   // start the animation
  //  this.id = requestAnimationFrame(this.animate.bind(this));
  // }

  // animate(time) {
  //   const timeDelta = time - this.lastTime;

  //   this.game.step(timeDelta);
  //   this.game.draw(this.ctx);
  //   this.lastTime = time;

  //   // every call to animate requests causes another call to animate
  //  this.id = requestAnimationFrame(this.animate.bind(this));
  // }
}


GameView.BG_COLOR = "#000000";
GameView.WIDTH = 1000; 
GameView.HEIGHT = 600;

GameView.MOVES = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
};

module.exports = GameView;