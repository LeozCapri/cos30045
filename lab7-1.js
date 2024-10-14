document.addEventListener("DOMContentLoaded", function () {
  // Wait for the DOM to be fully loaded before executing the script

  // Set dimensions of SVG canvas
  var w = 600;  // Width of the SVG canvas
  var h = 300;  // Height of the SVG canvas
  var padding = 50;  // Padding around the chart (to make space for axes, labels)

  // Parse the date
  var parseDate = d3.timeParse("%Y-%m");  // Function to parse date strings (in "YYYY-MM" format) into JavaScript Date objects

  // Load the CSV file
  d3.csv("../src/data/Unemployment_78-95.csv").then(function (data) {
      // Once the data is loaded from the CSV, this function processes the data

      // Convert year and month into a JavaScript Date object and numbers into integers
      data.forEach(function (d) {
          d.date = parseDate(d.year + "-" + d.month);  // Combine year and month into a string, then parse it into a Date object
          d.number = +d.number;  // Convert the unemployment number (from string) to an integer
      });

      console.log(data); // Check the imported data in console (for debugging purposes)

      // Step 1: Set up scales for the chart

      // X-axis scale: Time scale based on the date
      var xScale = d3.scaleTime()
          .domain(d3.extent(data, d => d.date))  // Domain is based on the min and max dates from the data
          .range([padding, w - padding]);  // Range is the width of the chart minus padding

      // Y-axis scale: Linear scale based on the unemployment numbers
      var yScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.number)])  // Domain is from 0 to the max unemployment number
          .range([h - padding, padding]);  // Range is from the bottom to the top of the chart (inverted since y increases downward in SVG)

      // Step 2: Define the line generator function
      // Line generator creates the path for the line based on the data
      var line = d3.line()
          .x(d => xScale(d.date))  // X coordinate for the line is based on the date
          .y(d => yScale(d.number));  // Y coordinate is based on the unemployment number

      // Step 3: Define the area generator function
      // Area generator fills the area under the line
      var area = d3.area()
          .x(d => xScale(d.date))  // X coordinate for the area is based on the date
          .y0(h - padding)  // Bottom of the area (y = 0 is the bottom of the chart)
          .y1(d => yScale(d.number));  // Top of the area is based on the unemployment number (same as the line)

      // Step 4: Append the SVG element
      var svg = d3.select("#chart")  // Select the element with ID "chart"
          .append("svg")  // Append an SVG element to the selected element
          .attr("width", w)  // Set the width of the SVG
          .attr("height", h);  // Set the height of the SVG

      // Step 5: Append the area path
      svg.append("path")
          .datum(data)  // Bind data to the path (datum binds all data to one element)
          .attr("class", "area")  // Add a class "area" to the path (for styling with CSS)
          .attr("d", area);  // Call the area generator function to draw the area

      // Step 6: (Optional) Append the line path on top of the area
      // This would draw the line on top of the area for better visibility
      // svg.append("path")
      //     .datum(data)  // Bind data to the path
      //     .attr("class", "line")  // Add a class "line" to the path (for styling)
      //     .attr("d", line);  // Call the line generator function to draw the line

      // Step 7: Add x-axis
      var xAxis = d3.axisBottom(xScale);  // Create the x-axis based on the xScale
      svg.append("g")  // Append a <g> element to hold the axis
          .attr("transform", "translate(0," + (h - padding) + ")")  // Move the x-axis to the bottom of the chart
          .call(xAxis);  // Call the xAxis function to generate the axis

      // Step 8: Add y-axis
      var yAxis = d3.axisLeft(yScale);  // Create the y-axis based on the yScale
      svg.append("g")  // Append a <g> element to hold the axis
          .attr("transform", "translate(" + padding + ",0)")  // Move the y-axis to the left of the chart
          .call(yAxis);  // Call the yAxis function to generate the axis

      // Step 9: Add an annotation for half a million unemployment (horizontal line)
      var halfMillion = 500000;  // Define the threshold for the horizontal line

      svg.append("line")  // Append a line to the SVG
          .attr("x1", padding)  // Starting x-coordinate (left side of the chart)
          .attr("x2", w - padding)  // Ending x-coordinate (right side of the chart)
          .attr("y1", yScale(halfMillion))  // y-coordinate is based on the yScale for half a million
          .attr("y2", yScale(halfMillion))  // y-coordinate for the end of the line
          .attr("stroke", "red")  // Set the stroke color to red
          .attr("stroke-dasharray", "4")  // Make the line dashed (for visual emphasis)
          .attr("stroke-width", 2);  // Set the line thickness

      // Step 10: Add a label for the annotation
      svg.append("text")  // Append a text element to the SVG
          .attr("x", w - (padding * 7))  // Set the x-coordinate for the text
          .attr("y", yScale(halfMillion) - 5)  // Set the y-coordinate just above the line
          .attr("text-anchor", "end")  // Align the text to the end (right-aligned)
          .attr("fill", "red")  // Set the text color to red (same as the line)
          .text("Half a million unemployed");  // The actual text to display
  });
});
