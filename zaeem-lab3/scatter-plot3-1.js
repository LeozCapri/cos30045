
            // Set the width, height, and padding for the SVG container
            var w = 800;
            var h = 300;
            var padding = 30;
            var textPadding = 15; // Padding value for text labels

            // Updated dataset with (500, 90) instead of (500, X)
            var dataset = [
              [5, 20],
              [250, 50],
              [100, 33],
              [330, 95],
              [410, 12],
              [475, 44],
              [25, 67],
              [85, 21],
              [500, 90], // Assuming X is meant to be 90 here
            ];

            // X scale (linear scaling for x values)
            var xScale = d3
              .scaleLinear()
              .domain([
                d3.min(dataset, function (d) {
                  return d[0];
                }),
                d3.max(dataset, function (d) {
                  return d[0];
                }),
              ])
              .range([padding, w - padding]); // Adjust the range to include padding

            // Y scale (reversing the Y values so higher values are at the top)
            var yScale = d3
              .scaleLinear()
              .domain([
                d3.min(dataset, function (d) {
                  return d[1];
                }),
                d3.max(dataset, function (d) {
                  return d[1];
                }),
              ])
              .range([h - padding, padding]); // Reverse the range for Y axis

            // Color scale for different x values
            var colorScale = d3
              .scaleLinear()
              .domain([
                d3.min(dataset, function (d) {
                  return d[0];
                }),
                d3.max(dataset, function (d) {
                  return d[0];
                }),
              ])
              .range(["green", "blue"]); // Color gradient from green to blue for most points

            // Create the SVG element inside the container
            var svg = d3
              .select("#drawing-with-data")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

            // Create circles for each data point
            svg
              .selectAll("circle")
              .data(dataset)
              .enter()
              .append("circle")
              .attr("cx", function (d) {
                return xScale(d[0]);
              }) // X position
              .attr("cy", function (d) {
                return yScale(d[1]);
              }) // Y position (reversed)
              .attr("r", 5) // Radius of the circle
              .attr("fill", function (d) {
                if (d[0] === 500) return "red"; // Make the circle red if x is 500
                return colorScale(d[0]); // Other points will have a gradient from green to blue
              });

            // Create text labels for each data point to display x and y values
            svg
              .selectAll("text")
              .data(dataset)
              .enter()
              .append("text")
              .text(function (d) {
                return d[0] + "," + d[1];
              }) // Text content: x and y values
              .attr("x", function (d) {
                return xScale(d[0]) + textPadding;
              }) // X position with padding
              .attr("y", function (d) {
                return yScale(d[1]) - textPadding;
              }) // Y position with padding (above the circle)
              .attr("fill", function (d) {
                if (d[0] === 500) return "red"; // Text color red for x = 500
                return "black"; // Default text color
              });
