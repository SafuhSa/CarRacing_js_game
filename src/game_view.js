class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    // this.ship = this.game.addShip()
  }
  // static
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

GameView.MOVES = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
};

module.exports = GameView;