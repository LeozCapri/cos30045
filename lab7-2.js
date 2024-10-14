document.addEventListener("DOMContentLoaded", function () {
// Step 1: Data
// Define the dataset for the chart (these will be the values used to generate the arcs)
var dataset = [10, 20, 30, 40, 50];

// Step 2: SVG Container
// Set the width and height of the SVG container
var width = 500, height = 500;

// Calculate the outer radius of the pie chart (half of the smallest dimension)
var outerRadius = Math.min(width, height) / 2;

// Set the inner radius for the donut chart (half of the outer radius for a nice "donut" shape)
var innerRadius = outerRadius / 2;

// Append an SVG element to the body and set its width and height
var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g") // Create a <g> element to group SVG shapes
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); 
    // Translate the group to the center of the SVG (since the default origin is top-left)

// Step 3: Pie & Arc setup
// Create a pie layout generator (this will calculate the angles for each arc based on the data)
var pie = d3.pie();

// Define an arc generator to draw the arcs with specified inner and outer radii
var arc = d3.arc()
    .innerRadius(innerRadius)  // The inner radius creates the hole in the center, turning it into a donut chart
    .outerRadius(outerRadius); // The outer radius defines the size of the arcs

// Step 4: Bind Data & Draw Arcs
// Select all 'g.arc' elements (there won't be any initially) and bind data to them using the pie generator
var arcs = svg.selectAll("g.arc")
    .data(pie(dataset)) // Bind the data from the pie layout generator (which gives us angles and data values)
    .enter()  // Enter selection (for the new data elements)
    .append("g")  // Append a <g> element for each arc (to group the path and text)
    .attr("class", "arc"); // Give each <g> element a class "arc"

// Step 5: Draw paths
// Define a color scale using d3's pre-defined category scheme
var color = d3.scaleOrdinal(d3.schemeCategory10);

// Append a path to each <g> element, set its "d" attribute (which defines the shape) using the arc generator
arcs.append("path")
    .attr("fill", function(d, i) {  // Set the fill color for each arc based on its index
        return color(i);
    })
    .attr("d", arc);  // The "d" attribute uses the arc generator to create the path for each segment

// Step 6: Add Labels (Positioned using arc.centroid)
// Append a text element to each arc to display the value in the center of the arc
arcs.append("text")
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";  // Use arc.centroid() to calculate the center of each arc segment
    })
    .attr("text-anchor", "middle")  // Center the text horizontally within each segment
    .text(function(d) {
        return d.value;  // Display the value of the data point inside each arc segment
    });

});
