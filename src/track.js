const LevelMaps = require('./level_maps');

class Track {
  constructor(game) {
    this.levelNow = 0;
    this.game = game;
    this.trackGrid = [];
    this.trackPics = []; // waiting to get from imageLoadingDoneSoStartGame in GameView from img loading loadImageForTrackCode;
  }

  returnTileTypeAtColRow(col, row) {
    if (col >= 0 && col < LevelMaps.COLS &&
      row >= 0 && row < LevelMaps.ROWS) {
      var trackIndexUnderCoord = this.rowColToArrayIndex(col, row);
      return this.trackGrid[trackIndexUnderCoord];
    } else {
      return LevelMaps.WALL;
    }
  }

  carTrackHandling(whichCar) {
    var carTrackCol = Math.floor(whichCar.x / LevelMaps.W);
    var carTrackRow = Math.floor(whichCar.y / LevelMaps.H);
    // var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

    if (carTrackCol >= 0 && carTrackCol < LevelMaps.COLS &&
      carTrackRow >= 0 && carTrackRow < LevelMaps.ROWS) {
      var tileHere = this.returnTileTypeAtColRow(carTrackCol, carTrackRow);

      if (tileHere == LevelMaps.GOAL) {
        console.log(whichCar.name + " WINS!");
        this.game.nextLevel();
      } else if (tileHere !== LevelMaps.ROAD) {
        // next two lines added to fix a bug, mentioned in video 9.6
        // undoes the car movement which got it onto the wall
        whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
        whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;
        whichCar.speed *= -0.5;
      };
    };
  };
  rowColToArrayIndex(col, row) {
    return col + LevelMaps.COLS * row;
  };

  drawTracks(canvasContext) {
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for (var eachRow = 0; eachRow < LevelMaps.ROWS; eachRow++) {
      for (var eachCol = 0; eachCol < LevelMaps.COLS; eachCol++) {

        var arrayIndex = this.rowColToArrayIndex(eachCol, eachRow);
        var tileKindHere = this.trackGrid[arrayIndex];
        var useImg = this.trackPics[tileKindHere];

        canvasContext.drawImage(useImg, drawTileX, drawTileY);
        drawTileX += LevelMaps.W;
        arrayIndex++;
      };
      drawTileY += LevelMaps.H;
      drawTileX = 0;
    }; 
  }; 
};
module.exports = Track;