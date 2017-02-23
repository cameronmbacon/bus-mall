'use strict';

//GLOBAL VARIABLES
var sectionEl = document.getElementById('survey-content');
var clickLimit = 25;
var totalClicks = 0;

//CONSTRUCTOR FUNCTION for generating products
function Product(productName, imagePath, elementID) {
  this.productName = productName;
  this.productImage = imagePath;
  this.elementID = elementID;
  this.imageEl;
  this.numberOfViews = 0;
  this.numberOfClicks = 0;
  this.percentage = (this.numberOfClicks / this.numberOfViews) * 100;
}

//properties array: this is where I store my objects' properties
var productProperties = [
  ['bag', 'img/bag.jpg', 'bagEl'],
  ['banana', 'img/banana.jpg', 'bananaEl'],
  ['bathroom', 'img/bathroom.jpg', 'bathroomEl'],
  ['boots', 'img/boots.jpg', 'bootsEl'],
  ['breakfast', 'img/breakfast.jpg', 'breakfastEl'],
  ['bubblegum', 'img/bubblegum.jpg', 'bubblegumEl'],
  ['chair', 'img/chair.jpg', 'chairEl'],
  ['cthulhu', 'img/cthulhu.jpg', 'cthulhuEl'],
  ['dog-duck', 'img/dog-duck.jpg', 'dogDuckEl'],
  ['dragon', 'img/dragon.jpg', 'dragonEl'],
  ['pen', 'img/pen.jpg', 'penEl'],
  ['pet-sweep', 'img/pet-sweep.jpg', 'petSweepEl'],
  ['scissors', 'img/scissors.jpg', 'scissorsEl'],
  ['shark', 'img/shark.jpg', 'sharkEl'],
  ['sweep', 'img/sweep.png', 'sweepEl'],
  ['tauntaun', 'img/tauntaun.jpg', 'tauntaunEl'],
  ['unicorn', 'img/unicorn.jpg', 'unicornEl'],
  ['usb', 'img/usb.gif', 'usbEl'],
  ['water-can', 'img/water-can.jpg', 'waterCanEl'],
  ['wine-glass', 'img/wine-glass.jpg', 'wineGlassEl']
];

//new objects are declared inside of the array
var products = [];

//this array stores the random numbers for the currently displayed products
var currentRandomNumbers = [];

// FUNCTION DECLARATIONS
//iterates with constructor function and pushes objects into PRODUCTS ARRAY
function createProducts() {
  if (localStorage.productsArray) {
    products = JSON.parse(localStorage.productsArray);

    for (var i = 0; i < products.length; i++) {
      Object.setPrototypeOf(products[i], Product.prototype);
    }

    //console.log(products);
  } else {
    for (var i = 0; i < productProperties.length; i++) {
      products.push(new Product(productProperties[i][0], productProperties[i][1], productProperties[i][2]));
    }
  }
};

//generates the random number used to access products from products array
function getRandomNumber() {
  return Math.floor(Math.random() * productProperties.length);
};

//validates the random number selections before pushing the numbers to currentRandomNumbers to ensure each group products is a simple random sample
function checkRandomNumbers() {
  var leftIndex = getRandomNumber();
  var centerIndex = getRandomNumber();
  var rightIndex = getRandomNumber();

  while (currentRandomNumbers.includes(leftIndex)) {
    leftIndex = getRandomNumber();
  }

  while (centerIndex === leftIndex || currentRandomNumbers.includes(centerIndex)) {
    centerIndex = getRandomNumber();
  }

  while (rightIndex === centerIndex || rightIndex === leftIndex || currentRandomNumbers.includes(rightIndex)) {
    rightIndex = getRandomNumber();
  }

  currentRandomNumbers = [leftIndex, centerIndex, rightIndex];
};

//renders the product image to the page
function renderProductsToPage() {
  for (var i = 0; i < currentRandomNumbers.length; i++) {
    products[currentRandomNumbers[i]].imageEl = document.createElement('img');

    products[currentRandomNumbers[i]].imageEl.setAttribute('src', products[currentRandomNumbers[i]].productImage);
    products[currentRandomNumbers[i]].imageEl.setAttribute('alt', products[currentRandomNumbers[i]].productName);
    products[currentRandomNumbers[i]].imageEl.setAttribute('id', products[currentRandomNumbers[i]].productName);

    products[currentRandomNumbers[i]].imageEl.addEventListener('click', handleClick);

    sectionEl.appendChild(products[currentRandomNumbers[i]].imageEl);

    products[currentRandomNumbers[i]].numberOfViews++;

    products[currentRandomNumbers[i]].getPercentage();
  }
};

//this function saves all of the products to local storage
function saveProductsToLocalStorage(productsArray) {
  localStorage.productsArray = JSON.stringify(productsArray);
  console.log('Saved to local storage!');
}

//this function gets all product clicks and returns the newly populated array
function allProductClicks(productsArray) {
  var productClicks = [];

  for (var i = 0; i < productsArray.length; i++) {
    productClicks.push(productsArray[i].numberOfClicks);
  }

  //console.log('All product clicks: ', productClicks);

  return productClicks;
}

//this function gets all product names and returns the newly populated array
function allProductNames(productsArray) {
  var productNames = [];

  for (var i = 0; i < productsArray.length; i++) {
    productNames.push(productsArray[i].productName);
  }

  //console.log('All product names: ', productNames);

  return productNames;
}

//this function gets all product percentages and returns the newly populated array
function allProductPercentages(productsArray) {
  var productPercentages = [];

  for (var i = 0; i < productsArray.length; i++) {
    productPercentages.push(productsArray[i].percentage);
  }

  //console.log('All product percentages: ', productPercentages);

  return productPercentages;
}

//handles the click event and controls flow of survey
function handleClick(event) {
  totalClicks++;

  var leftImageEl = products[currentRandomNumbers[0]].imageEl;
  var centerImageEl = products[currentRandomNumbers[1]].imageEl;
  var rightImageEl = products[currentRandomNumbers[2]].imageEl;

  var clickedEliD = event.target.getAttribute('id');

  if (totalClicks < clickLimit) {

    if (clickedEliD === leftImageEl.id) {
      products[currentRandomNumbers[0]].numberOfClicks++;

      products[currentRandomNumbers[0]].getPercentage();

    } else if (clickedEliD === centerImageEl.id) {
      products[currentRandomNumbers[1]].numberOfClicks++;

      products[currentRandomNumbers[1]].getPercentage();

    } else if (clickedEliD === rightImageEl.id) {
      products[currentRandomNumbers[2]].numberOfClicks++;

      products[currentRandomNumbers[2]].getPercentage();
    }

    sectionEl.removeChild(leftImageEl);
    sectionEl.removeChild(centerImageEl);
    sectionEl.removeChild(rightImageEl);

    checkRandomNumbers();
    renderProductsToPage();
  } else {
    var leftImageEl = products[currentRandomNumbers[0]].imageEl;
    var centerImageEl = products[currentRandomNumbers[1]].imageEl;
    var rightImageEl = products[currentRandomNumbers[2]].imageEl;

    var clickedEliD = event.target.getAttribute('id');

    saveProductsToLocalStorage(products);
  }
};

//METHODS
//this method calculates the percentage for number of times clicked when viewed
Product.prototype.getPercentage = function() {
  this.percentage = (this.numberOfClicks / this.numberOfViews) * 100;
  this.percentage = this.percentage.toFixed(2);
  return this.percentage;
};

//--------------------START OF APPLICATION-----------------------
createProducts(); //needs to be called in order to populate arrays

checkRandomNumbers(); //generates and verifies the first set of random numbers

renderProductsToPage(); //renders the first 3 product images to the page

//survey control flow is provided by the handleClick function
