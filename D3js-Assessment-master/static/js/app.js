// Note: To run server "python -m http.server --cgi 8000"

// Read and arrange the data
d3.json('data/data.json').then(function(data){ // Here getting the data using an ajax call
  // console.log(data); // tested whether or not I was getting the data

// Basic parameters of the svg (part 1), declaring variables
  var barData, 
      margin,
      width = 600,
      height = 500,
      margin = 200, // margins will be used to inset the ranges of our scales
      svgHeight,
      svgWidth,
      svg, // svg(scalable vector graphics)
      xScale,
      yScale,


// _______________________________________________________________________________
// Read and arrange the data
// Wanted to get the data in a more concise, readable format for graphical display
  barData = [];
  dataYears = [];
  for (var i = 0; i<data.length; i++) {
    dataYears.push(data[i].year)
    barData.push(data[i].points);
  }
// _______________________________________________________________________________

// Basic parameters of the svg (part 2)
  svgHeight = height + margin; // adjusted the SVG width and height by adding some margin to the SVG
  svgWidth = width + margin;  

  svg = d3.select('#svg-area') // here svg-area is being passed to svg
          .append('svg') // .append() appends a new element with the specified name as the last childe in the current selection
          .attr('width', svgWidth) // need to give the svg the attributes of height and width of whats defined above
          .attr('height', svgHeight + 200) // so due to the append, you'll see these attr in the elements right after svg area, as "svg"
          
          // D3 provides the ability to set attributes of a selected element using the attr() function. This function takes two parameters:
          // 1) Attribute Name - For example, "width" to set an SVG width.
          // 2) Value or An accessor function 

  tooltip = d3.select('body')
              .append('div')
              .attr('class', 'tooltip')
              .attr('opacity', '0');

// Set scales (x for years, y for points)
// We will have to create two axes, so we need to have two scales for two axes.
  xScale = d3.scaleBand() // scaleBand() is used to construct a band scale for the years
             .range ([0, svgWidth]) // The range for the band is the width of the SVG
             .padding(0.4) // thus is for padding between the bars

  yScale = d3.scaleLinear() // scaleLinear() This will create a quantitative linear scale
             .range([svgHeight, 0]) // Range is the output range that you would like your input values to map to, svgHeight is the height of our container (I believe), thats the highest we want our scale to go

// can console log before return to see the data below
  xScale.domain(data.map(function(d) { return d.year; })) // this code provides x axis, use data.map() to map our discrete year values to the x scale. THIS WORKS.
  yScale.domain([0, d3.max(data, function(d) { return d.points; })]) // And we use d3.max() function to input our domain [0,max] value for y axis. THIS WORKS.
// domain denotes the man and max of our data, takes array as an argument, d3.max is getting the largest data value in the array
// console.log(d3.max(data, function(d) { return d.points; }))
// console.log(data.map(function(d) { return d.year; }))


// Create axes
  var g;
  g = svg.append('g') // this adds a group element to our svg, and we will add our axes and bars to the group element
         .attr("transform", "translate(" + 100 + "," + 100 + ")"); // add a transform attribute to position our graph with some margin 


// Append the axes as G

// X Axis
  // console.log(svgHeight)
  // console.log(height)
  g.append("g") // addd another group element to have our x axis grouped under one element
   .attr('transform', "translate(0," + svgHeight + ")") // transform attribute to shift our x-axis towards the bottom of the SVG, had to add custum value instead of height, I did something funky it seems
   .call(d3.axisBottom(xScale)) // insert x-axis on this group element using .call(d3.axisBottom(x))
   .append("text")
   .attr("y", height - 460) // these values affects the year axis title
   .attr("x", width - 250)
   .attr("text-anchor", "end")
   .attr("stroke", "black")
   .text("Year");

// Y Axis
  g.append("g")
   .call(d3.axisLeft(yScale)
   .tickFormat(function(d){
    return d;
   }).ticks(25))
   .append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 25)
   .attr("x", -250.0)
   .attr("dy", "-6.1em")
   .attr("text-anchor", "end")
   .attr("stroke", "black")
   .text("Points Scored");

// Create Bars or Line function  
// ________________________________________________________________________________________________________________________________________________________
  g.selectAll(".bar") // bars are nothing more than rectangless, so we select all bar classes, since intially we have no bar, its empty
   .data(data) // passed in our bar data, this method takes our data into a waiting state
   .enter() // this method will take our data away form the waiting state and perform further methods/operations for each individual data item            This code explains how we added bars, created bars with our data using the SVG rect element
   .append("rect") // for each data item we are appending a rect in our svg(svg area) 
// _________________________________________________________________________________________________________________________________________________________
   .attr("class", "bar") // here we are giving rect the class of bar
   .attr("x", function(d) { //we need to specify the x and y positions of each of the bars and provide a width and height to the bars
    return xScale(d.year); // WORKS
   }) // specify the x and y positions of each of the bars and provide a width and height to the bars     
   .attr("y", function(d) {  
     return yScale(d.points); // changed it to d now im getting the values I want/ WORKS
    })
   .attr("width", xScale.bandwidth()) // The width of our bars would be determined by the scaleBand() function // THIS WORKS
   .attr("height", function(d) { 
     return svgHeight - yScale(d.points); 
    })

    
// tooltip
   .append('title') // need to append a tag for each display of tooltip data
   .text((individualElementsOfArray) => { // after making the title tag, add text into it that takes in the individual value of each rect, and displays it
      return `Bar Value: ${individualElementsOfArray.points}`
   })


// Legend function
  var valueHover; 
  valueHover = svg.selectAll('text.bar') // selects all text elements in the svg, and since we have no text elements upon writing this it will take none
    .data(data) // take in the data
    .enter() // this will bring in data one by one for further processing
    .append('text') // want to add a txt for each data item
    .attr("class", "bar")
    .attr("x", function(d) { return xScale(d.year) + 110; }) // appending the text to rect elements isnt valid in svg, and text wont show, instead needed to append the text to either g elements or yop-level svg
    .attr("y", function(d) {  return yScale(d.points) + 90; })
    .text(function(d) { return d.points; });

// Circle values
// Can use a function with an algorithm to get all of the highest 3 values, then only allow them to have circles on top
  var circle;
  circle = svg.selectAll('circle.circleLegend')
   .data(data) 
   .append('circle') // lets see if I can at least get it to show
   .attr("class", "circleLegend") // giving the appended circle this class
   .attr('cx', "20%") 
   .attr('cy', "20%")
   .attr('r', '10') // setting the size
   .style('fill', 'yellow')
  
// Axis Titles
// Chart title
  svg.append("text")
      .attr("transform", "translate(200,0) ")
      .attr("x", 50)
      .attr("y", 20)
      .attr("font-size", "24px")
      .text("Chelsea Football Points Scored Over Years")

//console.log(barData); // within scope 
//console.log(dataYears)
});
// json import, data is coming from the "data" attribute in the function callback
// use json editer online to understand what the data is supposed to look like
// Included everything within the ajax call so that it is within the scope of the data

// _________________________________________________________