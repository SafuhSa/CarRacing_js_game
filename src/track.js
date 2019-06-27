class Track {
  constructor() {
    this.levelNow = 0;
    this.trackGrid = [];
    this.trackPics = []; // waiting to get from imageLoadingDoneSoStartGame in GameView from img loading loadImageForTrackCode;
  }

  returnTileTypeAtColRow(col, row) {
    if (col >= 0 && col < TRACK_COLS &&
      row >= 0 && row < TRACK_ROWS) {
      var trackIndexUnderCoord = this.rowColToArrayIndex(col, row);
      return this.trackGrid[trackIndexUnderCoord];
    } else {
      return Track.WALL;
    }
  }

  carTrackHandling(whichCar) {
    var carTrackCol = Math.floor(whichCar.x / TRACK_W);
    var carTrackRow = Math.floor(whichCar.y / TRACK_H);
    // var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

    if (carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
      carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
      var tileHere = returnTileTypeAtColRow(carTrackCol, carTrackRow);

      if (tileHere == TRACK_GOAL) {
        console.log(whichCar.name + " WINS!");
        nextLevel();
      } else if (tileHere != Track.ROAD) {
        // next two lines added to fix a bug, mentioned in video 9.6
        // undoes the car movement which got it onto the wall
        whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
        whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;

        whichCar.speed *= -0.5;
      } // end of track found
    } // end of valid col and row
  } // end of carTrackHandling func
  rowColToArrayIndex(col, row) {
    return col + TRACK_COLS * row;
  }

  drawTracks(canvasContext) {
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
      for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {

        var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
        var tileKindHere = trackGrid[arrayIndex];
        var useImg = trackPics[tileKindHere];

        canvasContext.drawImage(useImg, drawTileX, drawTileY);
        drawTileX += TRACK_W;
        arrayIndex++;
      } // end of for each col
      drawTileY += TRACK_H;
      drawTileX = 0;
    } // end of for each row
  } // end of drawTracks func
}


Track.ROAD = 0;
Track.WALL = 1;
Track.PLAYERSTART = 2;
Track.GOAL = 3;
Track.TREE = 4;
Track.FLAG = 5;
Track.W = 40;
Track.H = 40;
Track.GAP = 2;
Track.COLS = 20;
Track.ROWS = 15;
