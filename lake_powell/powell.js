// set the dimensions and margins of the graph
var margin = {top: 30, right: 50, bottom: 50, left: 80};
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//create tooltip div
const tooltip = d3.select("body")
                  .append("div")
                  .attr("class", "tooltip");

//Read the data
d3.csv("https://raw.githubusercontent.com/tinaamath1/MSDV-MS-S23/main/data/lake_powell_elevation.csv")
  .then(function(data) {
    var parseTime = d3.timeParse("%Y");
    data.forEach(function(d) {
      d.year = parseTime(d.YEAR);
      d.elevation = +d.avg_elevation;
  }),

data = data.filter(function(d) { return d.year >= new Date("1970"); });

// Add X axis --> it is a year format
var x = d3.scaleTime()
          .domain([new Date("1970"), d3.max(data, function(d) { return d.year; })])
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x).ticks(d3.timeYear.every(5)))
          .style("font-family", "Source Sans Pro")
          .style("font-size", "18px")
          .attr("class", "axisGray");

// Add Y axis
var y = d3.scaleLinear()
          .domain([3500, d3.max(data, function(d) { return +d.elevation; })])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y))
          .style("font-family", "Source Sans Pro")
          .style("font-size", "18px")
          .attr("class", "axisGray");


//Set up the line generator
const line = d3.line()
               .x(d => x(d.year))
               .y(d => y(d.elevation));


// Add vertical gridlines
svg.selectAll("xGrid")
  .data(x.ticks().slice(1))
  .join("line")
  .attr("x1", d => x(d))
  .attr("x2", d => x(d))
  .attr("y1", 0)
  .attr("y2", height)
  .attr("stroke", "gray")
  .attr("stroke-width", .5);

//Add a circle element
const circle = svg.append("circle")
  .attr("r", 0)
  .attr("fill", "steelblue")
  .style("stroke", "white")
  .attr("opacity", .70)
  .style("pointer-events", "none");

// create a listening rectangle
const listeningRect = svg.append("rect")
    .attr("width", width)
    .attr("height", height);

const yearFormatter = d3.timeFormat("%Y");

// create the mouse move function
listeningRect.on("mousemove", function (event) {
      const [xCoord] = d3.pointer(event, this);
      // const bisectDate = d3.bisector(d => d.year).left;
      const x0 = yearFormatter(x.invert(xCoord));
      let i;

      for (let j = 0; j < data.length; j++) {
        if (data[j].YEAR===x0){
          i = j-1;
        }
      }
      console.log(x0,i)
     
      const d0 = data[i - 1];
      const d1 = data[i];
      console.log(data)

      // const d = x0 - d0.year > d1.year - x0 ? d1 : d0;
      const xPos = x(data[i].year);
      const yPos = y(data[i].elevation);

      console.log(y(data[i].elevation))
      
     

     // Update the circle position
      circle.attr("cx", xPos)
      .attr("cy", yPos);

     // Add transition for the circle radius
      circle.transition()
        .duration(50)
        .attr("r", 5);

      // add in  our tooltip
      tooltip
        .style("display", "block")
        .style("position", "absolute")
        .style("left", `${event.clientX + 10}px`)
        .style("top", `${event.clientY+ 10}px`)
        .html(`<strong>Year:</strong> ${yearFormatter(data[i].year)}<br><strong>Elevation:</strong> ${data[i].elevation !== undefined ? data[i].elevation + 'ft' : 'N/A'}`)
});

// listening rectangle mouse leave function

listeningRect.on("mouseleave", function () {
    circle.transition()
      .duration(50)
      .attr("r", 0);

    tooltip.style("display", "none");
 });

// Define the curve function
var curve = d3.curveCardinal.tension(0.5);



// Add the line
var path = svg.append("path")
              .datum(data)
              .attr("fill", "none")
              .attr("class", "line")
              .attr("stroke-width", 5)
              .attr("d", d3.line()
                .x(function(d) { return x(d.year)})
                .y(function(d) { return y(d.elevation) })
                .curve(curve)
                )

// Calculate the total length of the line
var totalLength = path.node().getTotalLength();

// Set the initial state of the line
path
  .attr("stroke-dasharray", totalLength + " " + totalLength)
  .attr("stroke-dashoffset", -totalLength)
  .transition()
  .duration(5000) // Set the duration of the animation in milliseconds
  .ease(d3.easeLinear) // Set the easing function for the animation
  .attr("stroke-dashoffset", 3); // Set the final state of the line


})


      //   // Add 1976-1978
      //   svg.append("rect")
      //   .attr("x", x(new Date("1976"))) // set the x position of the bar using the x scale
      //   .attr("y", 0) // set the y position of the bar at the top of the chart
      //   .attr("width", x(new Date("1978")) - x(new Date("1976"))) // set the width of the bar using the x scale
      //   .attr("height", height) // set the height of the bar to cover the entire chart
      //   .attr("fill", "#F6A931") // set the color of the bar
      //   .attr("opacity", 0.3); // set the opacity of the bar
   
      //  // Add 1980-1981
      //  svg.append("rect")
      //   .attr("x", x(new Date("1980"))) // set the x position of the bar using the x scale
      //   .attr("y", 0) // set the y position of the bar at the top of the chart
      //   .attr("width", x(new Date("1981")) - x(new Date("1980"))) // set the width of the bar using the x scale
      //   .attr("height", height) // set the height of the bar to cover the entire chart
      //   .attr("fill", "#F6A931") // set the color of the bar
      //   .attr("opacity", 0.3); // set the opacity of the bar
   
      //  // Add 1988-1992
      //  svg.append("rect")
      //   .attr("x", x(new Date("1988"))) // set the x position of the bar using the x scale
      //   .attr("y", 0) // set the y position of the bar at the top of the chart
      //   .attr("width", x(new Date("1992")) - x(new Date("1988"))) // set the width of the bar using the x scale
      //   .attr("height", height) // set the height of the bar to cover the entire chart
      //   .attr("fill", "#F6A931") // set the color of the bar
      //   .attr("opacity", 0.3); // set the opacity of the bar
   
      //  // Add 1999-2004
      //  svg.append("rect")
      //   .attr("x", x(new Date("1999"))) // set the x position of the bar using the x scale
      //   .attr("y", 0) // set the y position of the bar at the top of the chart
      //   .attr("width", x(new Date("2004")) - x(new Date("1999"))) // set the width of the bar using the x scale
      //   .attr("height", height) // set the height of the bar to cover the entire chart
      //   .attr("fill", "#F6A931") // set the color of the bar
      //   .attr("opacity", 0.3); // set the opacity of the bar
   
   
      //  // Add the 2008-2009
      //  svg.append("rect")
      //   .attr("x", x(new Date("2008"))) // set the x position of the bar using the x scale
      //   .attr("y", 0) // set the y position of the bar at the top of the chart
      //   .attr("width", x(new Date("2009")) - x(new Date("2008"))) // set the width of the bar using the x scale
      //   .attr("height", height) // set the height of the bar to cover the entire chart
      //   .attr("fill", "#F6A931") // set the color of the bar
      //   .attr("opacity", 0.3); // set the opacity of the bar
   
      //  // Add the 2009-2010
      //  svg.append("rect")
      //   .attr("x", x(new Date("2009"))) // set the x position of the bar using the x scale
      //   .attr("y", 0) // set the y position of the bar at the top of the chart
      //   .attr("width", x(new Date("2010")) - x(new Date("2009"))) // set the width of the bar using the x scale
      //   .attr("height", height) // set the height of the bar to cover the entire chart
      //   .attr("fill", "#F6A931") // set the color of the bar
      //   .attr("opacity", 0.3); // set the opacity of the bar
   
      //  // Add the 2012-2014
      //  svg.append("rect")
      //   .attr("x", x(new Date("2012"))) // set the x position of the bar using the x scale
      //   .attr("y", 0) // set the y position of the bar at the top of the chart
      //   .attr("width", x(new Date("2014")) - x(new Date("2012"))) // set the width of the bar using the x scale
      //   .attr("height", height) // set the height of the bar to cover the entire chart
      //   .attr("fill", "#F6A931") // set the color of the bar
      //   .attr("opacity", 0.3); // set the opacity of the bar
   
   
      //  // Add the 2017-2019
      //  svg.append("rect")
      //   .attr("x", x(new Date("2017"))) // set the x position of the bar using the x scale
      //   .attr("y", 0) // set the y position of the bar at the top of the chart
      //   .attr("width", x(new Date("2019")) - x(new Date("2017"))) // set the width of the bar using the x scale
      //   .attr("height", height) // set the height of the bar to cover the entire chart
      //   .attr("fill", "#F6A931") // set the color of the bar
      //   .attr("opacity", 0.3); // set the opacity of the bar
   
   
      //  // Add the 2019-2023
      //  svg.append("rect")
      //   .attr("x", x(new Date("2019-.8"))) // set the x position of the bar using the x scale
      //   .attr("y", 0) // set the y position of the bar at the top of the chart
      //   .attr("width", x(new Date("2023")) - x(new Date("2019"))) // set the width of the bar using the x scale
      //   .attr("height", height) // set the height of the bar to cover the entire chart
      //   .attr("fill", "#F6A931") // set the color of the bar
      //   .attr("opacity", 0.3); // set the opacity of the bar