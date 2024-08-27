// Function to create the bar chart with a color scheme
function barChart(wombatSightings) {
    
     // Define width and height of the SVG
     var w = 500;
     var h = 150;

     // Create SVG container inside the div with id 'chart'
     var svg = d3.select("#chart")
                 .append("svg")
                 .attr("width", w)
                 .attr("height", h);

    // Define color scale with darker shades of blue
    var colorScale = d3.scaleThreshold()
        .domain([10, 20, 30]) // Define thresholds for color ranges
        .range(["#b3cde0", "#6497b1", "#003f5c"]); // Darker shades of blue

    // Create bars for the bar chart
    svg.selectAll("rect")
        .data(wombatSightings)
        .enter() // Create a placeholder for each data point
        .append("rect") // Append a new rect element for each data point
        .attr("x", function(d, i) {
            return i * (w / wombatSightings.length); // Position each bar horizontally
        })
        .attr("y", function(d) {
            return h - (d.wombats * 3); // Position each bar vertically based on data
        })
        .attr("width", w / wombatSightings.length - 1) // Set the width of each bar
        .attr("height", function(d) {
            return d.wombats * 4; // Set the height of each bar based on data
        })
        .attr("fill", function(d) {
            return colorScale(d.wombats); // Apply color based on the value
        });

    // Add text labels below each bar
    svg.selectAll("text")
        .data(wombatSightings)
        .enter() // Create a placeholder for each data point
        .append("text") // Append a new text element for each data point
        .text(function(d) {
            return d.wombats; // Display the wombat number
        })
        .attr("x", function(d, i) {
            return i * (w / wombatSightings.length) + (w / wombatSightings.length) / 2; // Center text horizontally
        })
        .attr("y", function(d) {
            return h - (d.wombats * 4) -2; // Position text slightly below the bar
        })
        .attr("text-anchor", "middle") // Center text horizontally
        .attr("font-size", "12px") // Font size
        .attr("fill", "black"); // Text color
}

// Function to initialize the chart
function init() {
    d3.csv("Task_2.4_data.csv").then(function(data) {
        console.log(data); // Log data to the console for debugging

        wombatSightings = data;

        // Create the bar chart using the data
        barChart(wombatSightings);
    });
}

// Call the init function when the window loads
window.onload = init;
