document.addEventListener("DOMContentLoaded", function () {

    // Set up the dataset
    var dataset = [
      { apples: 5, oranges: 10, grapes: 22 },
      { apples: 4, oranges: 12, grapes: 28 },
      { apples: 2, oranges: 19, grapes: 32 },
      { apples: 7, oranges: 23, grapes: 35 },
      { apples: 23, oranges: 17, grapes: 43 }
    ];

    // Keys for the stack function (representing the different categories)
    var keys = ["apples", "oranges", "grapes"];

    // Stack the data based on the keys (apples, oranges, grapes)
    var stack = d3.stack()
      .keys(keys)(dataset);

    // Set up the dimensions for the SVG canvas
    var w = 400;  // Increase width of the SVG to accommodate more space
    var h = 300;  // Height of the SVG
    var padding = 50;  // Padding around the SVG

    // Set up the xScale using a band scale to distribute bars across the categories
    var xScale = d3.scaleBand()
      .domain(d3.range(dataset.length))  // Create a domain for the number of data points
      .range([padding, w - padding])  // Map it to the SVG width minus padding
      .padding(0.5);  // Increase the padding between bars for more space

    // Set up the yScale using a linear scale based on the total value for each stack
    var yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, d => d.apples + d.oranges + d.grapes)])  // Sum of all categories in each stack
      .range([h - padding, padding]);  // Range is from bottom (height minus padding) to the top (padding)

    // Set up the color scale for each category
    var color = d3.scaleOrdinal()
      .domain(keys)  // The different categories (apples, oranges, grapes)
      .range(["#ff9999", "#ffcc66", "#66cc66"]);  // Color for each category

    // Create an SVG canvas inside the element with id="chart"
    var svg = d3.select("#chart")
      .append("svg")
      .attr("width", w)  // Set the width of the SVG
      .attr("height", h);  // Set the height of the SVG

    // Create a group for each layer in the stack (apples, oranges, grapes)
    var groups = svg.selectAll("g")
      .data(stack)  // Bind the stacked data
      .enter()
      .append("g")  // Create a group for each stack layer
      .attr("fill", (d, i) => color(i));  // Set the fill color based on the category index

    // Create rectangles (bars) for each data point in the stack
    groups.selectAll("rect")
      .data(d => d)  // Bind each array of values in the stack
      .enter()
      .append("rect")  // Append a rectangle for each data point
      .attr("x", (d, i) => xScale(i))  // Set x position based on the data index
      .attr("y", d => yScale(d[1]))  // Set the y position using the upper value of the stack
      .attr("height", d => yScale(d[0]) - yScale(d[1]))  // Set height by subtracting the start and end of the stack
      .attr("width", xScale.bandwidth());  // Set the width based on the band scale's bandwidth

    // Create the x-axis and format the tick labels
    var xAxis = d3.axisBottom(xScale)
      .tickFormat((d, i) => "Category " + (i + 1));  // Label each category

    // Append the x-axis to the SVG
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (h - padding) + ")")  // Position the x-axis at the bottom
      .call(xAxis);  // Call the x-axis generator

    // Create the y-axis based on the yScale
    var yAxis = d3.axisLeft(yScale);

    // Append the y-axis to the SVG
    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + padding + ",0)")  // Position the y-axis on the left
      .call(yAxis);  // Call the y-axis generator
});
