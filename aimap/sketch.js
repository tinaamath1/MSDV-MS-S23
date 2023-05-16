// Load the data from the CSV file
d3.csv("usco2015.csv").then(data => {

    // Select the group containing the paths
    const stylegroup = d3.select("#stylegroup").style("cursor", "crosshair")
  
    // Create a map of FIPS to County and IC-WFrTo values
    const fipsMap = d3.group(data, d => d.FIPS);
  
    // Create tooltip element and style it with css
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "maptooltip")
      .style("opacity", 0)
      .style("position", "fixed")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");
  
    stylegroup.selectAll("path")
      .on("mouseover", function (event, d) {
        const fips = d3.select(this).attr('id').match(/FIPS_(\d+)/)[1];
        const county = fipsMap.get(fips)[0].COUNTY;
        const icWFrTo = fipsMap.get(fips)[0]['IC-WFrTo'];
  
        // when selected, there's a silver stroke
        d3.select(this).style('stroke', 'silver')
        .style('stroke-width', '1.8')
  
        // tooltip
        tooltip.html(`<b>${county}</b> uses <b>${icWFrTo} million</b> gallons per day.`) //this is the text
          .style("top", event.pageY + 60 + "px")
          .style("left", event.pageX + 20 + "px")
          .transition()
          .duration(1) //longer to easier be seen
          .style("opacity", 0.9)//this is for the tooltip
          .style("font-family", "Source Sans Pro");
      })

      .on("mouseout", function () {
  
        // tooltip disappear
        tooltip.style("opacity", 0);
  
        // no select stroke
        d3.select(this).style('stroke', '#D6CDBB')
        .style('stroke-width', '.75')
      });
  });

  