//LET'S BREAK THIS DOWN A BIT!
//---------------------------------------------------------------------
// * fix checkRandomNumber function
// * fix event listener
// * control the flow of the survey by concluding it after the participant has made 25 selections (clicks)
//-----------------------------------------------------------------------

//GLOBAL VARIABLES
var sectionEl = document.getElementById('survey-content');
// TO DO:
//consider adding left, right, and center image elements
//add a global variable for the click limit and total clicks

//CONSTRUCTOR FUNCTION for generating products
function Product(productName, imageURL, elementID) {
  this.productName = productName;
  this.productImage = imageURL;
  this.elementID = elementID;
  this.figureEl;
  this.imageEl;
  this.numberOfDisplays = 0;
  this.numberOfClicks = 0;
  this.clicksVsDisplayPercentage = 0;
}

//PROPERTIES ARRAY: this is where I store my objects' properties
var productProperties = [
  ['bag', 'img/bag.jpg', 'bagEl'],
  ['banana', 'img/banana.jpg', 'bananaEl'],
  ['bathroom', 'img/bathroom.jpg', 'bathroomEl'],
  ['boots', 'img/boots.jpg', 'bootsEl'],
  ['breakfast', 'img/breakfast.jpg', 'breakfastEl'],
  ['bubblegum', 'img/bubblegum.jpg', 'bubblegumEl'],
  ['chair', 'img/chair.jpg', 'chairEl'],
  ['cthulhu', 'img/cthulhu.jpg', 'cthulhuEl'],
  ['dog duck', 'img/dog-duck.jpg', 'dogDuckEl'],
  ['dragon', 'img/dragon.jpg', 'dragonEl'],
  ['pen', 'img/pen.jpg', 'penEl'],
  ['pet sweep', 'img/pet-sweep.jpg', 'petSweepEl'],
  ['scissors', 'img/scissors.jpg', 'scissorsEl'],
  ['shark', 'img/shark.jpg', 'sharkEl'],
  ['sweep', 'img/sweep.png', 'sweepEl'],
  ['tauntaun', 'img/tauntaun.jpg', 'tauntaunEl'],
  ['unicorn', 'img/unicorn.jpg', 'unicornEl'],
  ['usb', 'img/usb.gif', 'usbEl'],
  ['water can', 'img/water-can.jpg', 'waterCanEl'],
  ['wine glass', 'img/wine-glass.jpg', 'wineGlassEl']
];

//PRODUCTS ARRAY: new objects are declared inside of the array
var products = [];

//this array stores the random numbers for the currently displayed products
var currentRandomNumbers = [];

//this array stores the random numbers from the 3 previously displayed products
var oldRandomNumbers = [-1, -1, -1];

// FUNCTION DECLARATIONS
//iterates with constructor function and pushes objects into PRODUCTS ARRAY
function createProducts() {

  for (var i = 0; i < productProperties.length; i++) {

    products.push(new Product(productProperties[i][0], productProperties[i][1], productProperties[i][2]));
  }
};

//generates the random number used to access products from products array
function getRandomNumber() {

  var randomNumber = Math.floor(Math.random() * productProperties.length);

  return randomNumber;
};

//validates the random number selections before displaying products on page
function checkRandomNumbers() {

  for (var i = 0; i < 3; i++) {

    var randomNumber = getRandomNumber();

    var validOption = false;

    while (!validOption) {
      if (randomNumber !== oldRandomNumbers[0] && randomNumber !== oldRandomNumbers[1] && randomNumber !== oldRandomNumbers[2]) {
        if (i > 0) {
          if (randomNumber === currentRandomNumbers[i - 1] || randomNumber === currentRandomNumbers[i - 2]) {
            randomNumber = getRandomNumber();
          } else {
            validOption = true;
            currentRandomNumbers.push(randomNumber);
            products[i].numberOfDisplays++;
          } //end of innermost if/else statement
        } else {
          validOption = true;
          currentRandomNumbers.push(randomNumber);
          products[i].numberOfDisplays++;
        }
      } else {
        randomNumber = getRandomNumber();
      } //end of outermost if/else statement
    }; //end of while loop
  }

  oldRandomNumbers = currentRandomNumbers;

};
//MORNING SOLUTION: declare left, center and right index and assign random numbers
//USE ARRAY METHOD includes()
//while the left index is included in currentlyShowing array, get a new random number
//while center is equal to left OR center index is included in currentlyShowing array, get a new random numbers,
//while right is equal to left OR center OR right index is included in the currentlyShowing array, get a new random number
//increment the views of the left hand product by 1

//renders the product image to the page
function renderProductsToPage() {

  for (var i = 0; i < currentRandomNumbers.length; i++) {
    products[currentRandomNumbers[i]].figureEl = document.createElement('figure');
    products[currentRandomNumbers[i]].figureEl.setAttribute('id', products[currentRandomNumbers[i]].elementID);

    products[currentRandomNumbers[i]].figureEl.addEventListener('click', products[currentRandomNumbers[i]].handleClick);

    products[currentRandomNumbers[i]].imageEl = document.createElement('img');
    products[currentRandomNumbers[i]].imageEl.setAttribute('src', products[currentRandomNumbers[i]].productImage);
    products[currentRandomNumbers[i]].imageEl.setAttribute('alt', products[currentRandomNumbers[i]].productName);

    products[currentRandomNumbers[i]].figureEl.appendChild(products[currentRandomNumbers[i]].imageEl);
    sectionEl.appendChild(products[currentRandomNumbers[i]].figureEl);
  }
};

//renders results to page at conclusion of survey
function renderResultsToPage() {
  var unorderedEl = document.createElement('ul');

  for (var i = 0; i < products.length; i++) {
    var resultsMessage = products[i].numberOfClicks + 'votes for ' + products[i].productName;

    var listItemEl = document.createElement('li');
    listItemEl.textContent = resultsMessage;

    unorderedEl.appendChild(listItemEl);
  }

  sectionEl.appendChild(unorderedEl);
}

//PROTOTYPE METHODS
//handles the click event
Product.prototype.handleClick = function(event) {
  event.stopPropagation();

  this.numberOfClicks++;
};

//calculates the percentages and displays them to page
Product.prototype.getPercentage = function() {
  this.clicksVsDisplayPercentage = this.numberOfClicks / this.numberOfDisplays;

  return this.clicksVsDisplayPercentage;
};

//CONSOLE LOGS FOR DEBUGGING
createProducts(); //needs to be called in order to populate arrays

console.log(productProperties);

console.log(products);

console.log(oldRandomNumbers);
checkRandomNumbers();
console.log(currentRandomNumbers);
console.log(oldRandomNumbers);

renderProductsToPage();

renderResultsToPage();
