// Select all the groups of SVG elements except for the first one
const groups = d3.selectAll(".group");

// Set initial opacity and y position for all SVG elements within each group
groups.selectAll("svg *")
  .style("opacity", 0)

// Animate each group to gradually fade in from the bottom with a delay between each layer
groups.transition()
  .duration(500)
  .delay((d, i) => d3.easeCircleOut(i / groups.size()) * 1000)
  .selectAll("svg *")
  .transition()
  .duration(500)
  .delay((d, i) => i * 50)
  .style("opacity", 1)
  .attr("transform", "translate(0, 0)");
