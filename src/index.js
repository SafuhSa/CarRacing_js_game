import _ from 'lodash';
// const Game = require('./game');
const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", () => { 
  const canvasEl = document.getElementById("gameCanvas");
  canvasEl.width = GameView.WIDTH;
  canvasEl.height = GameView.HEIGHT;
  const ctx = canvasEl.getContext("2d");

  
  // const game = new Game();
  new GameView(canvasEl, ctx).loadGame();
})
// ctx.fillStyle = 'black';
// ctx.fillRect(0, 0, canvasEl.width, canvasEl.height)
// ctx.fillStyle = 'white';
// ctx.beginPath();
// ctx.arc(100, 100, 10, 0, Math.PI*2, true);
// ctx.fill();