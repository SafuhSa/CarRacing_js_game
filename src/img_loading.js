

class ImgLoading {
  constructor() {
    this.picsToLoad = 0; // set automatically based on imageList in loadImages()
  }

  countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    // console.log(picsToLoad);
    if (picsToLoad == 0) {
      imageLoadingDoneSoStartGame();
    }
  }
  
  beginLoadingImage(imgVar, fileName) {
    imgVar.onload = this.countLoadedImagesAndLaunchIfReady.bind(this);
    imgVar.src = "images/" + fileName;
  }

  loadImageForTrackCode(trackCode, fileName) {
    trackPics[trackCode] = document.createElement("img");
    this.beginLoadingImage(trackPics[trackCode], fileName);
  }

  loadImages() {
    var imageList = [
      { varName: carPic, theFile: "player1car.png" },
      { varName: otherCarPic, theFile: "player2car.png" },

      { trackType: TRACK_ROAD, theFile: "track_road.png" },
      { trackType: TRACK_WALL, theFile: "track_wall.png" },
      { trackType: TRACK_GOAL, theFile: "track_goal.png" },
      { trackType: TRACK_TREE, theFile: "track_tree.png" },
      { trackType: TRACK_FLAG, theFile: "track_flag.png" }
    ];

    picsToLoad = imageList.length;

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
