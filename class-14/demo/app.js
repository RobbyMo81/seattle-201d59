'use strict';

// references to DOM elements
var img1 = document.getElementById('img1');
var img2 = document.getElementById('img2');
var img3 = document.getElementById('img3');
var renderedImages = [img1.alt, img2.alt, img2.alt];

// Reference to canvas
var canvas = document.getElementById('chart');

// Variable to track total number of user clicks
var totalClicks = 0;

// what's in localstorage is empty then create our intial objects;
if (!localStorage.imageData) {
  new UserImg('bag', './assets/bag.jpg');
  new UserImg('banana', './assets/banana.jpg');
  new UserImg('bathroom', './assets/bathroom.jpg');
  new UserImg('breakfast', './assets/breakfast.jpg');
  new UserImg('boots', './assets/boots.jpg');
  new UserImg('chair', './assets/chair.jpg');
  new UserImg('dog-duck', './assets/dog-duck.jpg');
  new UserImg('dragon', './assets/dragon.jpg');
  new UserImg('pen', './assets/pen.jpg');
  new UserImg('pet-sweep', './assets/pet-sweep.jpg');
  new UserImg('scissors', './assets/scissors.jpg');
  new UserImg('shark', './assets/shark.jpg');
} else {
  // if local storage has something using our key, than reinstantiate
  var state = getData('imageData');
  for (var i = 0; i < state.length; i++) {
    // create a new UserImg from local Stored Object literals
    var imgFromStorage = new UserImg(state[i].name, state[i].image);

    // adding properties that get initalied with a new intance of UserImg
    imgFromStorage.timesClicked = state[i].timesClicked;
    imgFromStorage.timesRendered = state[i].timesRendered;
  }
};

console.log(allImages);

// Tracking Clicks
img1.addEventListener('click', handleClick);
img2.addEventListener('click', handleClick);
img3.addEventListener('click', handleClick);

function handleClick(event) {
  // get id attribute from the HTML
  var imageId = event.target.alt;

  // conditional for total click => Check how many times the user has clicked
  if (totalClicks < 5) {
    // traverse our array and increment timesClicked values
    for (var i = 0; i < allImages.length; i++) {
      if (allImages[i].name === imageId) {
        allImages[i].timesClicked++;
      }
    }
    renderImages();
    saveData(allImages);
    totalClicks++;
  } else {
    // Remove event listeners if totalClicks is at a specific.
    img1.removeEventListener('click', handleClick);
    img2.removeEventListener('click', handleClick);
    img3.removeEventListener('click', handleClick);
    alert('Youre done clicking');
    console.log(allImages);
  }
  // saving data?
}

// Render Picture.
function renderImages() {
  var firstImage = getFreshImage();
  img1.setAttribute('src', firstImage.image);
  img1.setAttribute('alt', firstImage.name);
  firstImage.timesRendered++;

  var secondImage = getFreshImage();
  img2.setAttribute('src', secondImage.image);
  img2.setAttribute('alt', secondImage.name);
  secondImage.timesRendered++

  var thirdImage = getFreshImage();
  img3.setAttribute('src', thirdImage.image);
  img3.setAttribute('alt', thirdImage.name);
  thirdImage.timesRendered++;
}

// produce a randomImage
function generateRandomImage() {
  var randomIndex = Math.floor(Math.random() * allImages.length);
  var randomImage = allImages[randomIndex];
  return randomImage;
}

// produce an Image that are not currently rendered;
function getFreshImage() {
  var image = generateRandomImage();

  while (img1.alt === image.name || img2.alt === image.name || img3.alt === image.name) {
    image = generateRandomImage();
  }
  return image;
}

// rendering our chart with click and render data
// How can we grab user click data.

// Persisting our UserImg data

function saveData(data) {
  // What is out application state?
  // all the images saved to allImages
  var stringifiedData = JSON.stringify(data);
  localStorage.setItem('imageData', stringifiedData);
}

function getData(key) {
  var stringData = localStorage.getItem(key);
  var parsedData = JSON.parse(stringData);
  return parsedData;
}

renderImages();