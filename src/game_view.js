const GraphicCommon = require('./graphics_common');
// const ImgLoading = 
class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  loadGame() {
    GraphicCommon.colorRect(this.ctx, 0, 0, GameView.WIDTH, GameView.HEIGHT, 'black');
    GraphicCommon.colorText(this.ctx, "LOADING IMAGES", GameView.WIDTH / 2, GameView.HEIGHT / 2, 'white');

    loadImages();
  }
  
  start() {


    this.bindKeyHandlers();
    this.lastTime = 0;
    // start the animation
   this.id = requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    // every call to animate requests causes another call to animate
   this.id = requestAnimationFrame(this.animate.bind(this));
  }
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