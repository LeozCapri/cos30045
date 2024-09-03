// // Function to create the bar chart with axes
// function barChart(wombatSightings, svg, w, h) {
//     // Define color scale with darker shades of blue
//     var colorScale = d3.scaleThreshold()
//         .domain([10, 20, 30]) // Define thresholds for color ranges
//         .range(["#b3cde0", "#6497b1", "#003f5c"]); // Darker shades of blue

//     // Create a scale for the x-axis
//     var xScale = d3.scaleBand()
//         .domain(d3.range(wombatSightings.length))
//         .range([0, w])
//         .padding(0.1); // Adjusts the padding between bars

//     // Create a scale for the y-axis
//     var yScale = d3.scaleLinear()
//         .domain([0, d3.max(wombatSightings, function(d) { return d.wombats; })])
//         .range([h, 0]);

//     // Create bars for the bar chart
//     svg.selectAll("rect")
//         .data(wombatSightings)
//         .enter()
//         .append("rect")
//         .attr("x", function(d, i) {
//             return xScale(i); // Use the x scale for positioning
//         })
//         .attr("y", function(d) {
//             return yScale(d.wombats); // Use the y scale for positioning
//         })
//         .attr("width", xScale.bandwidth()) // Set the width of each bar
//         .attr("height", function(d) {
//             return h - yScale(d.wombats); // Set the height of each bar
//         })
//         .attr("fill", function(d) {
//             return colorScale(d.wombats); // Apply color based on the value
//         });

//     // Add x-axis
//     svg.append("g")
//         .attr("class", "x-axis")
//         .attr("transform", "translate(0," + h + ")")
//         .call(d3.axisBottom(xScale).tickFormat((d, i) => i + 1)); // Custom tick labels for indices

//     // Add y-axis
//     svg.append("g")
//         .attr("class", "y-axis")
//         .call(d3.axisLeft(yScale).ticks(5)); // Adjust number of ticks as needed
// }

// // Function to initialize the chart
// function init() {
//     d3.csv("Task_2.4_data.csv").then(function(data) {
//         console.log(data); // Log data to the console for debugging

//         // Convert the data to numerical values
//         data.forEach(function(d) {
//             d.wombats = +d.wombats; // Ensure data is in numeric format
//         });

//         // Define width and height of the SVG
//         var w = 500;
//         var h = 300;

//         // Create SVG container inside the div with id 'chart'
//         var svg = d3.select("#chart")
//                     .append("svg")
//                     .attr("width", w)
//                     .attr("height", h);

//         // Create the bar chart using the data
//         barChart(data, svg, w, h);
//     });
// }

// // Call the init function when the window loads
// window.onload = init;

// // Function to create the bar chart with axes and labels under bars
// function barChart(wombatSightings, svg, w, h) {
//     var colorScale = d3.scaleThreshold()
//         .domain([10, 20, 30])
//         .range(["#b3cde0", "#6497b1", "#003f5c"]);

//     var xScale = d3.scaleBand()
//         .domain(d3.range(wombatSightings.length))
//         .range([0, w])
//         .padding(0.1);

//     var yScale = d3.scaleLinear()
//         .domain([0, d3.max(wombatSightings, function(d) { return d.wombats; })])
//         .range([h, 0]);

//     svg.selectAll("rect")
//         .data(wombatSightings)
//         .enter()
//         .append("rect")
//         .attr("x", function(d, i) {
//             return xScale(i);
//         })
//         .attr("y", function(d) {
//             return yScale(d.wombats);
//         })
//         .attr("width", xScale.bandwidth())
//         .attr("height", function(d) {
//             return h - yScale(d.wombats);
//         })
//         .attr("fill", function(d) {
//             return colorScale(d.wombats);
//         });

//     // Add labels under each bar
//     svg.selectAll(".label")
//         .data(wombatSightings)
//         .enter()
//         .append("text")
//         .attr("class", "label")
//         .attr("x", function(d, i) {
//             return xScale(i) + xScale.bandwidth() / 2; // Center the text
//         })
//         .attr("y", h + 15) // Position text below the x-axis
//         .attr("text-anchor", "middle")
//         .text(function(d) {
//             return d.wombats; // Use the wombat value as label
//         });

//     svg.append("g")
//         .attr("class", "x-axis")
//         .attr("transform", "translate(0," + h + ")")
//         .call(d3.axisBottom(xScale).tickFormat((d, i) => i + 1));

//     svg.append("g")
//         .attr("class", "y-axis")
//         .call(d3.axisLeft(yScale).ticks(5));
// }

// // Function to initialize the chart remains the same
// function init() {
//     d3.csv("Task_2.4_data.csv").then(function(data) {
//         console.log(data);

//         data.forEach(function(d) {
//             d.wombats = +d.wombats;
//         });

//         var w = 500;
//         var h = 300;

//         var svg = d3.select("#chart")
//                     .append("svg")
//                     .attr("width", w)
//                     .attr("height", h + 20); // Extra height for labels

//         barChart(data, svg, w, h);
//     });
// }

// window.onload = init;

// // Function to create a horizontal bar chart
// function horizontalBarChart(wombatSightings, svg, w, h) {
//     var colorScale = d3.scaleThreshold()
//         .domain([10, 20, 30])
//         .range(["#b3cde0", "#6497b1", "#003f5c"]);

//     // Create a scale for the x-axis (now representing the data values)
//     var xScale = d3.scaleLinear()
//         .domain([0, d3.max(wombatSightings, function(d) { return d.wombats; })])
//         .range([0, w]);

//     // Create a scale for the y-axis (now representing the categories)
//     var yScale = d3.scaleBand()
//         .domain(d3.range(wombatSightings.length))
//         .range([0, h])
//         .padding(0.1);

//     svg.selectAll("rect")
//         .data(wombatSightings)
//         .enter()
//         .append("rect")
//         .attr("x", 0) // All bars start at x = 0
//         .attr("y", function(d, i) {
//             return yScale(i); // Use the y scale for positioning
//         })
//         .attr("width", function(d) {
//             return xScale(d.wombats); // Use the x scale for the width of bars
//         })
//         .attr("height", yScale.bandwidth()) // Set the height of each bar
//         .attr("fill", function(d) {
//             return colorScale(d.wombats);
//         });

//     // Add y-axis (categories)
//     svg.append("g")
//         .attr("class", "y-axis")
//         .call(d3.axisLeft(yScale).tickFormat((d, i) => i + 1));

//     // Add x-axis (data values)
//     svg.append("g")
//         .attr("class", "x-axis")
//         .attr("transform", "translate(0," + h + ")")
//         .call(d3.axisBottom(xScale).ticks(5));
// }

// // Function to initialize the horizontal chart
// function initHorizontal() {
//     d3.csv("Task_2.4_data.csv").then(function(data) {
//         console.log(data);

//         data.forEach(function(d) {
//             d.wombats = +d.wombats;
//         });

//         var w = 500;
//         var h = 300;

//         var svg = d3.select("#chart")
//                     .append("svg")
//                     .attr("width", w)
//                     .attr("height", h);

//         horizontalBarChart(data, svg, w, h);
//     });
// }

// window.onload
