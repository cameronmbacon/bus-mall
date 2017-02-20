//LET'S BREAK THIS DOWN A BIT!
//---------------------------------------------------------------------
//3. write a global function that: generates a random number within the range of the number of objects present in the array.
//4. write a global function that: displays 3 products at a time from the array, does not show duplicate objects, and does not display objects that were shown in the preceding group of 3.
//5. write a global function that: renders the data to the page for the participant to view at the conclusion of the survey.
//6. write a prototype method that: counts the number of times an object was displayed.
//7. write a prototype method that: counts the number of times an object was clicked.
//8. write a prototype method that: calculates a percentage based on the number of times an object was displayed versus the number of times it was clicked.
//9. control the flow of the survey by concluding it after the participant has made 25 selections (clicks).
//-----------------------------------------------------------------------

//CONSTRUCTOR FUNCTION for generating products
function Product(productName, imageURL, elementID) {
  this.productName = productName;
  this.productImage = imageURL;
  this.elementID = elementID;
  this.numberOfDisplays = 0;
  this.numberOfClicks = 0;
  this.clicksVsDisplayPercentage = 0;
}

//PRODUCTS ARRAY: new objects are declared inside of the array
var products = [];

//PROPERTIES ARRAY: this is where I store my objects' properties
var productProperties = [['bag', 'img/bag.jpg', 'bagEl'], ['banana', 'img/banana.jpg', 'bananaEl'], ['bathroom', 'img/bathroom.jpg', 'bathroomEl'], ['boots', 'img/boots.jpg', 'bootsEl'], ['breakfast', 'img/breakfast.jpg', 'breakfastEl'], ['bubblegum', 'img/bubblegum.jpg', 'bubblegumEl'], ['chair', 'img/chair.jpg', 'chairEl'], ['cthulhu', 'img/cthulhu.jpg', 'cthulhuEl'], ['dog duck', 'img/dog-duck', 'dogDuckEl'], ['dragon', 'img/dragon.jpg', 'dragonEl'], ['pen', 'img/pen.jpg', 'penEl'], ['pet sweep', 'img/pet-sweep.jpg', 'petSweepEl'], ['scissors', 'img/scissors.jpg', 'scissorsEl'], ['shark', 'img/shark.jpg', 'sharkEl'], ['sweep', 'img/sweep.png', 'sweepEl'], ['tauntaun', 'img/tauntaun.jpg', 'tauntaunEl'], ['unicorn', 'img/uncicorn.jpg', 'unicornEl'], ['usb', 'img/usb.gif', 'usbEl'], ['water can', 'img/water-can.jpg', 'waterCanEl'], ['wine glass', 'img/wine-glass.jpg', 'wineGlassEl']];

console.log('There are ' + productProperties.length + ' sets of property parameters in productProperties array.');

//GLOBAL FUNCTION that iterates with constructor function and pushes objects into PRODUCTS ARRAY
// function generateProductsToArray() {
//
//   for (var i = 0; i < productProperties.length; i++) {
//     new Product(name, imgURL, iD);
//   }
// }
