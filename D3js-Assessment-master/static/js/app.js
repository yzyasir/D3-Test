// Note: To run server "python -m http.server --cgi 8000"

// Read and arrange the data
d3.json('data/data.json').then(function(data){ // Here getting the data using an ajax call
  // console.log(data); // tested whether or not I was getting the data

// Basic parameters of the svg (part 1), declaring variables
  var barData, 
      margin,
      width = 900,
      height = 600,
      svgHeight,
      svgWidth,
      svg


// _______________________________________________________________________________
// Read and arrange the data
// Wanted to get the data in a more concise, readable format for graphical display
  barData = [];
  for (var i = 0; i<data.length; i++) {
    barData.push(data[i].points);
  }
// _______________________________________________________________________________

// Basic parameters of the svg (part 2)
  margin = {
    top: 15,
    bottom: 15,
    left: 70,
    right: 15
  };

  svgHeight = height + margin.top + margin.bottom;
  svgWidth = width + margin.left + margin.right;

  svg = d3.select('#svg-area')
          .append('svg')
          .attr('width', svgWidth) // need to give the svg the attributes of height and width of whats defined above
          .attr('height', svgHeight)

  tooltip = d3.select('body')
              .append('div')
              .attr('class', 'tooltip')
              .attr('opacity', '0');

// Set scales




// Create axes



// Append the axes as G





// Create Bars or Line function




// Create Circle group




// Mouseover / mouseout



// tooltip



// Legend function


console.log(barData); // within scope 
});
// json import, data is coming from the "data" attribute in the function callback
// use json editer online to understand what the data is supposed to look like
// Included everything within the ajax call so that it is within the scope of the data




// _________________________________________________________
// var width = 900; 
// var height = 600;

// var svgHeight = height + margin.top + margin.bottom;
// var svgWidth = width + margin.left + margin.right;

// var svg = d3.select('#svg-area')
//             .append('svg')
//             .attr('width', svgWidth) // need to give the svg the attributes of height and width of whats defined above
//             .attr('height', svgHeight)
            

// var tooltip = d3.select('body')
//                 .append('div')
//                 .attr('class', 'tooltip')
//                 .attr('opacity', '0');