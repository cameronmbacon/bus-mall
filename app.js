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
