d3.json('data/data.json').then(function(data){
  // console.log(data);
  var barData = [];
  for (var i = 0; i<data.length; i++) {
    barData.push(data[i].points);
  }
  console.log(barData);
})
// json import, data is coming from the "data" attribute in the function callback
// use json editer online to understand what the data is supposed to look like

// Basic parameters of the svg
var margin = {
  top: 15,
  bottom: 15,
  left: 70,
  right: 15
};

var width = 900; 
var height = 600;

var svgHeight = height + margin.top + margin.bottom;
var svgWidth = width + margin.left + margin.right;

var svg = d3.select('#svg-area')
            .append('svg')
            .attr('width', svgWidth) // need to give the svg the attributes of height and width of whats defined above
            .attr('height', svgHeight)
            

var tooltip = d3.select('body')
                .append('div')
                .attr('class', 'tooltip')
                .attr('opacity', '0');

// Read and arrange the data




// Set scales




// Create axes



// Append the axes as G





// Create Bars or Line function




// Create Circle group




// Mouseover / mouseout



// tooltip



// Legend function
