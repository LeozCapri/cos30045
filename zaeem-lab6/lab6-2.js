document.addEventListener("DOMContentLoaded", function () {
    // Set dimensions for the SVG canvas
    var w = 500;
    var h = 350;
    var padding = 1;
  
    // Dataset containing initial values for the bars
    var dataset = [14, 6, 26, 23, 9, 56, 15, 49, 80];
  
    // xScale to set the bar positions based on their index
    var xScale = d3
      .scaleBand() // Create a scale for band positioning (categorical)
      .domain(d3.range(dataset.length)) // Map each data index to a bar
      .rangeRound([0, w]) // Set the range to the SVG width
      .paddingInner(0.05); // Add padding between bars
  
    // yScale to set the height of each bar based on the value
    var yScale = d3
      .scaleLinear() // Create a linear scale for numerical data
      .domain([0, d3.max(dataset)]) // Map the data values to the height of the chart
      .range([h, 0]); // Range reversed because higher values should be on top
  
    // Append an SVG element to the .card-body container
    var svg = d3
      .select(".card-body")
      .append("svg")
      .attr("width", w) // Set the width of the SVG
      .attr("height", h); // Set the height of the SVG
  
    // Variable to track sorting order (ascending/descending)
    var sortAscending = true;
  
    // Function to draw bars based on the dataset
    function drawBars(data) {
      // Bind the data to the rect elements and provide a key function to track them
      var bars = svg.selectAll("rect").data(data, function (d) {
        return d;
      });
  
      // Enter phase: create new rects for any new data
      bars
        .enter()
        .append("rect") // Append rect elements for each data point
        .attr("x", w) // Initial x position off-canvas for transition effect
        .attr("y", function (d) {
          return yScale(d); // Position rects based on their value (yScale)
        })
        .attr("width", xScale.bandwidth()) // Set width based on xScale
        .attr("height", function (d) {
          return h - yScale(d); // Set the height based on the value
        })
        .attr("fill", function (d) {
          return d > 10 ? "red" : "black"; // Color the bars conditionally
        })
        .on("mouseover", function (event, d) {
          // Change color on mouseover and display tooltip
          d3.select(this).attr("fill", "orange");
  
          svg
            .append("text") // Add a tooltip to show the value
            .attr("id", "tooltip") // Tooltip id for easy removal
            .attr(
              "x",
              parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2
            ) // Center the tooltip above the bar
            .attr("y", parseFloat(d3.select(this).attr("y")) - 5) // Position tooltip above the bar
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .text(d); // Display the bar's value
        })
        .on("mouseout", function (event, d) {
          // Restore the original bar color and remove the tooltip
          d3.select(this).attr("fill", d > 10 ? "red" : "black");
          d3.select("#tooltip").remove();
        })
        .merge(bars) // Merge the enter and update selections
        .transition() // Transition to new positions after sort/addition
        .duration(2000) // 2 second duration
        .ease(d3.easeCubicInOut) // Smooth ease effect
        .attr("x", function (d, i) {
          return xScale(i); // Update x position for each bar based on index
        })
        .attr("y", function (d) {
          return yScale(d); // Update y position for each bar based on value
        })
        .attr("height", function (d) {
          return h - yScale(d); // Update height based on value
        });
  
      // Exit phase: remove old bars that no longer have corresponding data
      bars.exit().transition().duration(2000).attr("x", w).remove(); // Transition them off-canvas and remove
    }
  
    // Initial call to draw the bars with the dataset
    drawBars(dataset);
  
    // Event listener for the 'Add' button to add a new random value to the dataset
    d3.select("#addButton").on("click", function () {
      var newValue = Math.floor(Math.random() * 100); // Generate a random value
      dataset.push(newValue); // Add the new value to the dataset
      xScale.domain(d3.range(dataset.length)); // Update xScale domain with the new dataset length
      drawBars(dataset); // Redraw the bars
    });
  
    // Event listener for the 'Remove' button to remove the last value from the dataset
    d3.select("#removeButton").on("click", function () {
      dataset.pop(); // Remove the last value in the dataset
      xScale.domain(d3.range(dataset.length)); // Update xScale domain
      drawBars(dataset); // Redraw the bars
    });
  
    // Event listener for the 'Ease Circle In' button
    d3.select("#easeCircleInButton").on("click", function () {
      var newValue = Math.floor(Math.random() * 100); // Add random value
      dataset.push(newValue); // Add new value to dataset
      xScale.domain(d3.range(dataset.length)); // Update the domain
  
      // Create new bars with ease effect (easeCircleIn)
      svg
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
          return xScale(i); // Set x position
        })
        .attr("y", h) // Start rect at the bottom of SVG
        .attr("width", xScale.bandwidth()) // Set bar width
        .attr("height", 0) // Set height to 0 for the transition
        .attr("fill", function (d) {
          return d > 10 ? "red" : "black"; // Conditionally set fill color
        })
        .transition()
        .duration(2000) // 2 second transition
        .ease(d3.easeCircleIn) // Use easeCircleIn for animation effect
        .attr("y", function (d) {
          return yScale(d); // Set y position based on the value
        })
        .attr("height", function (d) {
          return h - yScale(d); // Set height based on value
        });
  
      drawBars(dataset); // Redraw bars
    });
  
    // Event listener for the 'Ease Elastic Out' button
    d3.select("#easeElasticOutButton").on("click", function () {
      var newValue = Math.floor(Math.random() * 100); // Add random value
      dataset.push(newValue); // Add new value to dataset
      xScale.domain(d3.range(dataset.length)); // Update the domain
  
      // Create new bars with ease effect (easeElasticOut)
      svg
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
          return xScale(i); // Set x position
        })
        .attr("y", h) // Start rect at the bottom of SVG
        .attr("width", xScale.bandwidth()) // Set bar width
        .attr("height", 0) // Set height to 0 for the transition
        .attr("fill", function (d) {
          return d > 10 ? "red" : "black"; // Conditionally set fill color
        })
        .transition()
        .duration(2000) // 2 second transition
        .ease(d3.easeElasticOut) // Use easeElasticOut for animation effect
        .attr("y", function (d) {
          return yScale(d); // Set y position based on the value
        })
        .attr("height", function (d) {
          return h - yScale(d); // Set height based on value
        });
  
      drawBars(dataset); // Redraw bars
    });
  
    // Event listener for the 'Sort' button to sort the dataset in ascending or descending order
    d3.select("#sortButton").on("click", function () {
      if (sortAscending) {
        dataset.sort(d3.ascending); // Sort in ascending order
      } else {
        dataset.sort(d3.descending); // Sort in descending order
      }
      sortAscending = !sortAscending; // Toggle sort order
  
      xScale.domain(d3.range(dataset.length)); // Update xScale domain
  
      svg
        .selectAll("rect")
        .sort(function (a, b) {
          if (sortAscending) {
            return d3.ascending(a, b); // Sort bars in ascending order
          } else {
            return d3.descending(a, b); // Sort bars in descending order
          }
        })
        .transition() // Transition sorted bars
        .duration(2000) // 2 second transition
        .ease(d3.easeCubicInOut) // Smooth ease effect
        .attr("x", function (d, i) {
          return xScale(i); // Set x position based on sorted order
        });
  
      drawBars(dataset); // Redraw bars
    });
  });
  