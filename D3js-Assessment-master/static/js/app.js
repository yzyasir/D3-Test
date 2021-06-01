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
      svg, // svg(scalable vector graphics)
      X,
      Y,
      barChart


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
    bottom: 15, // These margins will be used to inset the ranges of our scales
    left: 70, // Rather than extending from 0 to the full width and height of the chart...
    right: 15 // ...the starts and ends of the ranges are moved inward by the corresponding margins.
  };

  svgHeight = height + margin.top + margin.bottom; // the y range
  svgWidth = width + margin.left + margin.right;  // the x range

  svg = d3.select('#svg-area') // here svg-area is being passed to svg
          .append('svg')
          .attr('width', svgWidth) // need to give the svg the attributes of height and width of whats defined above
          .attr('height', svgHeight)

  tooltip = d3.select('body')
              .append('div')
              .attr('class', 'tooltip')
              .attr('opacity', '0');

// Set scales
  // X = d3.scaleBand() // this function in d3 used to construct a new band, horizontal positions of the bars is given by a band scale
  //       .domain(d3.range(data.length))
  //       .range([margin.left, width - margin.right])
  //       .padding(0.1)

  // Y = d3.scaleLinear()
  //       .domain([0, 100])
  //       .range([height - margin.bottom, margin.top])

// Create axes




// Append the axes as G





// Create Bars or Line function
  var barWidth;
  barWidth = (svgWidth / barData.length);
  
  barChart = svg.selectAll("rect") // bars are nothing more than rectangless, so we select all rectangles
    .data(barData) // passed in our bar data, this method takes our data into a waiting state
    .enter() // this method will take our data away form the waiting state and perform further methods/operations for each individual data item
    .append("rect") // for each data item we are appending a rect in our svg(svg area) 
    .attr("y", function(d) { // this function gets the data in its parameter
        return svgHeight - d // attr y is then calculated when height is then subtracted by the data in the parameter
    })
    .attr("height", function(d) { // height is just the value of the data
      return d;
    })
    .attr("width", barWidth)
    .attr("transform", function(d, i) {
      var translate = [barWidth * i, 0]; // this is [x, y]
      return "translate("+ translate +")"; // in this step we calc the translation of our bars
    })

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