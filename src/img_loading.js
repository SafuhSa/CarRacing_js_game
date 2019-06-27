const Track = require('./track');
class ImgLoading {
  constructor() {
    this.picsToLoad = 0; // set automatically based on imageList in loadImages()
    this.trackPics = [];

    // this.countLoadedImagesAndLaunchIfReady = this.countLoadedImagesAndLaunchIfReady.bind(this);
    // this.beginLoadingImage = this.beginLoadingImage.bind(this);
    // this.loadImageForTrackCode = this.loadImageForTrackCode.bind(this);
  }

  countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    // console.log(picsToLoad);
    if (picsToLoad == 0) {
      imageLoadingDoneSoStartGame(this.trackPics);
    }
  }

  beginLoadingImage(imgVar, fileName) {
    imgVar.onload = this.countLoadedImagesAndLaunchIfReady;
    imgVar.src = "images/" + fileName;
  }

  loadImageForTrackCode(trackCode, fileName) {
    this.trackPics[trackCode] = document.createElement("img");
    this.beginLoadingImage(this.trackPics[trackCode], fileName);
  }

  loadImages() {
    var carPic = document.createElement("img");
    var otherCarPic = document.createElement("img");

    var imageList = [
      { varName: carPic, theFile: "player1car.png" },
      { varName: otherCarPic, theFile: "player2car.png" },

      { trackType: Track.ROAD, theFile: "track_road.png" },
      { trackType: Track.WALL, theFile: "track_wall.png" },
      { trackType: Track.GOAL, theFile: "track_goal.png" },
      { trackType: Track.TREE, theFile: "track_tree.png" },
      { trackType: Track.FLAG, theFile: "track_flag.png" }
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
