const LevelMaps = require('./level_maps');


class ImgLoading {
  constructor(GameView) {
    this.picsToLoad = 0; // set automatically based on imageList in loadImages()
    this.trackPics = [];
    this.gameView = GameView;
    this.carPic = document.createElement("img");
    this.otherCarPic = document.createElement("img");


    
    this.countLoadedImagesAndLaunchIfReady = this.countLoadedImagesAndLaunchIfReady.bind(this);
    this.beginLoadingImage = this.beginLoadingImage.bind(this);
    this.loadImageForTrackCode = this.loadImageForTrackCode.bind(this);
    this.loadImages = this.loadImages.bind(this);
  }

  countLoadedImagesAndLaunchIfReady() {
    this.picsToLoad--;
    // console.log(this.picsToLoad);
    if (this.picsToLoad == 0) {
      // console.log('image loaded')
      this.gameView.imageLoadingDoneSoStartGame(this.trackPics, this.carPic, this.otherCarPic);
    }
  }

  beginLoadingImage(imgVar, fileName) {
    imgVar.onload = this.countLoadedImagesAndLaunchIfReady;
    imgVar.src = "./images/" + fileName;
  }

  loadImageForTrackCode(trackCode, fileName) {
    this.trackPics[trackCode] = document.createElement("img");
    this.beginLoadingImage(this.trackPics[trackCode], fileName);
  }

  loadImages() {
    var imageList = [
      { varName: this.carPic, theFile: "player1car.png" },
      { varName: this.otherCarPic, theFile: "player2car.png" },

      { trackType: LevelMaps.ROAD, theFile: "track_road.png" },
      { trackType: LevelMaps.WALL, theFile: "track_wall.png" },
      { trackType: LevelMaps.GOAL, theFile: "track_goal.png" },
      { trackType: LevelMaps.TREE, theFile: "track_tree.png" },
      { trackType: LevelMaps.FLAG, theFile: "track_flag.png" }
    ];

    this.picsToLoad = imageList.length;
    for (var i = 0; i < imageList.length; i++) {
      if (imageList[i].varName !== undefined) {
        this.beginLoadingImage(imageList[i].varName, imageList[i].theFile);
      } else {
        this.loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
      }
    }
  }
};

module.exports = ImgLoading;
