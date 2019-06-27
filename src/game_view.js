const GraphicCommon = require('./graphics_common');
const ImgLoading = require('./img_loading');
const Track = require('./track');
const LevelMaps = require("./level_maps");
const car = require('./car');

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.levelNow = 0;
    this.track = new Track()
    this.blueCar = new carClass();
    this.greenCar = new carClass();

    this.drawAll = this.drawAll.bind(this);
    this.imageLoadingDoneSoStartGame = this.imageLoadingDoneSoStartGame.bind(this);
    this.updateAll = this.updateAll.bind(this);
  }

  loadGame() {
    GraphicCommon.colorRect(this.ctx, 0, 0, GameView.WIDTH, GameView.HEIGHT, 'black');
    GraphicCommon.colorText(this.ctx, "LOADING IMAGES", GameView.WIDTH / 2, GameView.HEIGHT / 2, 'white');
    new ImgLoading(this).loadImages();
  }

  imageLoadingDoneSoStartGame(trackPics) {
    this.track.trackPics = trackPics;
    var framesPerSecond = 30;
    // setInterval(this.updateAll, 1000 / framesPerSecond);

    // setupInput();

    this.loadLevel(LevelMaps.levelList[this.levelNow]);
  }

  nextLevel() {
    this.levelNow++;
    if (this.levelNow >= levelList.length) {
      this.levelNow = 0;
    }
    this.loadLevel(LevelMaps.levelList[levelNow]);
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