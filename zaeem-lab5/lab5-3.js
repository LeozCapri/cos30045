document.addEventListener("DOMContentLoaded", function() {
    // Set dimensions for the SVG container
    var w = 500;
    var h = 350;
    var padding = 1;

    // Initial dataset
    var dataset = [14, 6, 26, 23, 9, 56, 15, 49, 80];

    // Create scales for x and y axes
    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0, w])
        .paddingInner(0.05);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([h, 0]);

    // Create SVG element
    var svg = d3.select(".card-body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // Function to draw the bars and labels
    function drawBars(data) {
        // Create bars
        var bars = svg.selectAll("rect")
            .data(data);

        // Enter new bars
        var barsEnter = bars.enter()
            .append("rect")
            .attr("x", w)  // Start from the right
            .attr("y", function(d) {
                return yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                return h - yScale(d);
            })
            .attr("fill", function(d) {
                return d > 10 ? "red" : "black";
            })
            .merge(bars)  // Merge existing bars
            .transition()  // Transition for entering bars
            .duration(2000)
            .ease(d3.easeCubicInOut)
            .attr("x", function(d, i) {
                return xScale(i);
            })
            .attr("y", function(d) {
                return yScale(d);
            })
            .attr("height", function(d) {
                return h - yScale(d);
            });

        // Create labels
        var labels = svg.selectAll("text")
            .data(data);

        // Enter new labels
        labels.enter()
            .append("text")
            .attr("x", function(d, i) {
                return xScale(i) + xScale.bandwidth() / 2; // Center the label
            })
            .attr("y", function(d) {
                return yScale(d) - 5; // Position above the bar
            })
            .attr("text-anchor", "middle") // Center the text
            .text(function(d) {
                return d; // Set the text to the value
            })
            .merge(labels)  // Merge existing labels
            .transition()  // Transition for entering labels
            .duration(2000)
            .ease(d3.easeCubicInOut)
            .attr("x", function(d, i) {
                return xScale(i) + xScale.bandwidth() / 2; // Center the label
            })
            .attr("y", function(d) {
                return yScale(d) - 5; // Position above the bar
            })
            .text(function(d) {
                return d; // Update the text to the new value
            });

        // Update bars
        bars.exit()
            .transition()  // Transition for exiting bars
            .duration(2000)
            .attr("x", w)  // Move exiting bars to the right
            .remove();  // Remove them from the DOM

        // Update labels
        labels.exit()
            .transition()  // Transition for exiting labels
            .duration(2000)
            .attr("x", w)  // Move exiting labels to the right
            .remove();  // Remove them from the DOM
    }

    // Draw the initial bars
    drawBars(dataset);

    // Event listener for adding data
    d3.select("#addButton")
        .on("click", function() {
            // Generate a new random number
            var newValue = Math.floor(Math.random() * 25);
            dataset.push(newValue);  // Add the new value

            // Update scales
            xScale.domain(d3.range(dataset.length));
            yScale.domain([0, d3.max(dataset)]);

            drawBars(dataset);  // Redraw the bars with the updated dataset
        });

    // Event listener for removing data
    d3.select("#removeButton")
        .on("click", function() {
            if (dataset.length > 0) {
                dataset.shift();  // Remove the first element

                // Update scales
                xScale.domain(d3.range(dataset.length));
                yScale.domain([0, d3.max(dataset)]);

                drawBars(dataset);  // Redraw the bars with the updated dataset
            }
        });

    // Function to update the bars for different easing options
    function updateBars(newData, easeFunction) {
        // Update scales
        yScale.domain([0, d3.max(newData)]);

        // Select all bars and update their data
        svg.selectAll("rect")
            .data(newData)
            .transition()
            .duration(2000)
            .ease(easeFunction)
            .attr("y", function(d) {
                return yScale(d);
            })
            .attr("height", function(d) {
                return h - yScale(d);
            });

        // Update labels
        svg.selectAll("text")
            .data(newData)
            .transition()
            .duration(2000)
            .ease(easeFunction)
            .attr("y", function(d) {
                return yScale(d) - 5; // Position above the bar
            })
            .text(function(d) {
                return d; // Update the text to the new value
            });

        // Update y-axis
        svg.select(".y.axis")
            .transition()
            .duration(2000)
            .ease(easeFunction)
            .call(d3.axisLeft(yScale));
    }

    // Event listener for Ease Circle In button
    d3.select("#easeCircleInButton")
        .on("click", function() {
            var newData = Array.from({ length: dataset.length }, () => Math.floor(Math.random() * 25));
            updateBars(newData, d3.easeCircleIn);
        });

    // Event listener for Ease Elastic Out button
    d3.select("#easeElasticOutButton")
        .on("click", function() {
            var newData = Array.from({ length: dataset.length }, () => Math.floor(Math.random() * 25));
            updateBars(newData, d3.easeElasticOut);
        });
});
