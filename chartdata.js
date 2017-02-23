'use-strict';

var chartEl = document.getElementById('chart');
var pieChartEl = document.getElementById('pie-chart');

// FUNCTION DECLARATIONS
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

  console.log('All product clicks: ', productClicks);

  return productClicks;
}

//this function gets all product names and returns the newly populated array
function allProductNames(productsArray) {
  var productNames = [];

  for (var i = 0; i < productsArray.length; i++) {
    productNames.push(productsArray[i].productName);
  }

  console.log('All product names: ', productNames);

  return productNames;
}

//this function gets all product percentages and returns the newly populated array
function allProductPercentages(productsArray) {
  var productPercentages = [];

  for (var i = 0; i < productsArray.length; i++) {
    productPercentages.push(productsArray[i].percentage);
  }

  console.log('All product percentages: ', productPercentages);

  return productPercentages;
}

//this function takes 5 colors as arguments and pushes them to the labelColors array
function setLabelColors(colorOne, colorTwo, colorThree, colorFour, colorFive) {
  var colors = [];

  for (var i = 0; i < 4; i++) {
    colors.push(colorOne);
    colors.push(colorTwo);
    colors.push(colorThree);
    colors.push(colorFour);
    colors.push(colorFive);
  }

  return colors;
};

//renders results to page at conclusion of survey
//NOW UTILIZES Charts.js LIBRARY!!!
function renderResultsToPage() {
  var ctx = document.getElementById('chart').getContext('2d');
  var pieCtx = document.getElementById('pie-chart').getContext('2d');

  var allProducts = JSON.parse(localStorage.productsArray); //products array, BUT AS A STRING!

  var clickData = allProductClicks(allProducts);
  var allNames = allProductNames(allProducts);
  var pieData = allProductPercentages(allProducts); //Mmmmmm...pie...

  var labelColors = setLabelColors('blue', 'yellow', 'red', 'purple', 'green');

  var barChartData = {
    type: 'bar',
    data: {
      labels: allNames,
      datasets: [{
        label: 'clicks',
        data: clickData,
        backgroundColor: 'green'
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            fontSize: 18,
            fontColor: 'blue',
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            fontSize: 24,
            fontColor: 'navy',
            beginAtZero: true
          }
        }]
      }
    }
  };

  var myBarChart = new Chart(ctx, barChartData);

  var pieChartData = {
    type: 'pie',
    data: {
      labels: allNames,
      datasets: [{
        label: '%',
        data: pieData,
        backgroundColor: labelColors
      }],
    },
    options: {
      circumference: (2 * Math.PI),
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

  var myPieChart = new Chart(pieCtx, pieChartData);
}

renderResultsToPage();
