//LET'S BREAK THIS DOWN A BIT!
//---------------------------------------------------------------------
// * fix checkRandomNumber function - CHECK!
// * fix displayProducts function - CHECK!
// * fix event listener - CHECK!
// * control the flow of the survey by concluding it after the participant has made 25 selections (clicks) - CHECK!
//-----------------------------------------------------------------------

//GLOBAL VARIABLES
var sectionEl = document.getElementById('survey-content');
var chartEl = document.getElementById('chart');
var clickLimit = 5;
var totalClicks = 0;

//CONSTRUCTOR FUNCTION for generating products
function Product(productName, imageURL, elementID) {
  this.productName = productName;
  this.productImage = imageURL;
  this.elementID = elementID;
  this.imageEl;
  this.numberOfViews = 0;
  this.numberOfClicks = 0;
  this.clicksVsDisplayPercentage = 0;
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
  for (var i = 0; i < productProperties.length; i++) {
    products.push(new Product(productProperties[i][0], productProperties[i][1], productProperties[i][2]));
  }
};

//generates the random number used to access products from products array
function getRandomNumber() {
  return Math.floor(Math.random() * productProperties.length);
};

//validates the random number selections before displaying products on page then populates currentRandomNumbers array with the random numbers
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
  }
};

//renders results to page at conclusion of survey
function renderResultsToPage() {
  var unorderedEl = document.createElement('ul');

  for (var i = 0; i < products.length; i++) {
    var resultsMessage = products[i].numberOfClicks + ' votes for ' + products[i].productName;

    var listItemEl = document.createElement('li');
    listItemEl.textContent = resultsMessage;

    unorderedEl.appendChild(listItemEl);
  }

  chartEl.appendChild(unorderedEl);
}

//handles the click event and controls flow of survey
function handleClick(event) {
  totalClicks++;

  if (totalClicks < clickLimit) {

    var leftImageEl = products[currentRandomNumbers[0]].imageEl;
    var centerImageEl = products[currentRandomNumbers[1]].imageEl;
    var rightImageEl = products[currentRandomNumbers[2]].imageEl;

    var clickedEliD = event.target.getAttribute('id');

    if (clickedEliD === leftImageEl.id) {
      products[currentRandomNumbers[0]].numberOfClicks++;

    } else if (clickedEliD === centerImageEl.id) {
      products[currentRandomNumbers[1]].numberOfClicks++;

    } else if (clickedEliD === rightImageEl.id) {
      products[currentRandomNumbers[2]].numberOfClicks++;
    }

    sectionEl.removeChild(leftImageEl);
    sectionEl.removeChild(centerImageEl);
    sectionEl.removeChild(rightImageEl);

    checkRandomNumbers();
    renderProductsToPage();
  } else {
    renderResultsToPage();
  }
};

//PROTOTYPE METHODS
//calculates the percentages and displays them to page
Product.prototype.getPercentage = function() {
  return this.numberOfClicks / this.numberOfDisplays;
};

//--------------------START OF APPLICATION-----------------------
createProducts(); //needs to be called in order to populate arrays

checkRandomNumbers(); //generates and verifies the first set of random numbers

renderProductsToPage(); //renders the first 3 product images to the page

//survey control flow is provided by the handleClick function
