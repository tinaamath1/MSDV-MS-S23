var margin = {top:10,right:150,bottom:30,left:0},
    width  = 600 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom,
    boxSize = 20, //size of each box
    boxGap = 3, //space between each box
    howManyAcross = Math.floor(width / boxSize);
  
// Select all the groups of SVG elements except for the first one
const groups = d3.selectAll(".group");

// Set initial opacity and y position for all SVG elements within each group
groups.selectAll("svg *")
  .style("opacity", 0)

// Animate each group to gradually fade in from the bottom with a delay between each layer
document.querySelector("svg").addEventListener("mouseover", function() {
    groups.transition()
    .duration(500)
    .delay((d, i) => d3.easeCircleOut(i / groups.size()) * 1000)
    .selectAll("svg *")
    .transition()
    .duration(500)
    .delay((d, i) => i * 100)
    .style("opacity", 1)
    .attr("transform", "translate(0, 0)")
    console.log("check")
},{once : true}
)


setTimeout(() => {
    d3.select("#total").html("PER STATE");
  }, "9550");


setTimeout(() => {
  d3.select(".california_27").html("27%");
  d3.select('.california_27').attr('class','california_27 fade-in-image');
}, "9550");

setTimeout(() => {
  d3.select(".colorado_24").html("24%");
  d3.select('.colorado_24').attr('class','colorado_24 fade-in-image');
}, "9550"); 

setTimeout(() => {
  d3.select(".arizona_17").html("17%");
  d3.select('.arizona_17').attr('class','arizona_17 fade-in-image');
}, "9550");

setTimeout(() => {
  d3.select(".utah_10").html("10%");
  d3.select('.utah_10').attr('class','utah_10 fade-in-image');
}, "9550");

setTimeout(() => {
  d3.select(".mexico_9").html("9%");
  d3.select('.mexico_9').attr('class','mexico_9 fade-in-image');
}, "9550");

setTimeout(() => {
  d3.select(".newmexico_5").html("5%");
  d3.select('.newmexico_5').attr('class','newmexico_5 fade-in-image');
}, "9550");

setTimeout(() => {
  d3.select(".wyoming_6").html("6%");
  d3.select('.wyoming_6').attr('class','wyoming_6 fade-in-image');
}, "9550");

setTimeout(() => {
  d3.select(".nevada_2").html("2%");
  d3.select('.nevada_2').attr('class','nevada_2 fade-in-image');
}, "9550");



// d3.select("#total")
//   .transition()
//   .delay(500)
//   .html("PER STATE")
  