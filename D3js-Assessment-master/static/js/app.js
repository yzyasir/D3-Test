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
      yScale,
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

  svgHeight = height + margin.top + margin.bottom; // the y 
  svgWidth = width + margin.left + margin.right;  // the x 

  svg = d3.select('#svg-area') // here svg-area is being passed to svg
          .append('svg') // .append() appends a new element with the specified name as the last childe in the current selection
          .attr('width', svgWidth) // need to give the svg the attributes of height and width of whats defined above
          .attr('height', svgHeight) // so due to the append, you'll see these attr in the elements right after svg area, as "svg"

          // D3 provides the ability to set attributes of a selected element using the attr() function. This function takes two parameters:
          // 1) Attribute Name - For example, "width" to set an SVG width.
          // 2) Value or An accessor function 

  tooltip = d3.select('body')
              .append('div')
              .attr('class', 'tooltip')
              .attr('opacity', '0');

// Set scales
  X = d3.scaleBand() // this function in d3 used to construct a new band, horizontal positions of the bars is given by a band scale
        .domain(d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1)

  yScale = d3.scaleLinear() // this is a method we have created to be input into our barchart
        .domain([0, d3.max(barData)]) // takes array as an argument, d3.max is getting the largest data value in the array
        .range([0, svgHeight]) // svgHeight is the height of our container (I believe), thats the highest we want our scale to go

// Create axes



// Append the axes as G



// Create Bars or Line function
  var barWidth;
  barWidth = (svgWidth / barData.length);
  
  barChart = svg.selectAll("rect") // bars are nothing more than rectangless, so we select all rectangles, since intially we have no rect, its empty
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
    .attr('fill', 'green')

// tooltip
    .append('title') // need to append a tag for each display of tooltip data
    .text((individualElementsOfArray) => { // after making the title tag, add text into it that takes in the individual value of each rect, and displays it
      return `Bar Value: ${individualElementsOfArray}`
    })

// Create Circle group



// Mouseover / mouseout



// Legend function
  var valueHover
  valueHover = svg.selectAll('text') // selects all text elements in the svg, and since we have no text elements upon writing this it will take none
    .data(barData) // take in the data
    .enter() // this will bring in data one by one for further processing
    .append('text') // want to add a txt for each data item
    .text(function(d) {
      return d; // we want the value of the text to be the value of our data item
    })
    .attr('y', function(d, i) {
      return svgHeight - d - 3; // want our text to be higher than out bar, thats why we are subtracting 3 more pixels
    })
    .attr('x', function(d, i) {
      return barWidth * i; // we want the text element to be at the start of each bar
    })

console.log(barData); // within scope 
});
// json import, data is coming from the "data" attribute in the function callback
// use json editer online to understand what the data is supposed to look like
// Included everything within the ajax call so that it is within the scope of the data

// _________________________________________________________