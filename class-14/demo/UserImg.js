'use strict';

// array for all images
var allImages = [];

function UserImg(name, imgPath) {
  this.name = name;
  this.image = imgPath;
  this.timesClicked = 0;
  this.timesRendered = 0;
  allImages.push(this);
}