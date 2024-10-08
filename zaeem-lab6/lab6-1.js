document.addEventListener("DOMContentLoaded", function() {
    // Set dimensions for the SVG container
    var w = 500;
    var h = 400;
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

    // Function to draw the bars
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
            .on("mouseover", function(event, d) {
                d3.select(this)
                    .attr("fill", "orange");

                // Add tooltip
                svg.append("text")
                    .attr("id", "tooltip")
                    .attr("x", parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2)
                    .attr("y", parseFloat(d3.select(this).attr("y")) - 5)
                    .attr("text-anchor", "middle")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "13px")
                    .attr("font-weight", "bold")
                    .attr("fill", "black")
                    .text(d);
            })
            .on("mouseout", function(event, d) {
                d3.select(this)
                    .attr("fill", d > 10 ? "red" : "black");

                // Remove tooltip
                d3.select("#tooltip").remove();
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

        // Update bars
        bars.exit()
            .transition()  // Transition for exiting bars
            .duration(2000)
            .attr("x", w)  // Move exiting bars to the right
            .remove();  // Remove them from the DOM
    }

    // Draw the initial bars
    drawBars(dataset);

    // Event listener for adding data
    d3.select("#addButton")
        .on("click", function() {
            // Generate a new random number
            var newValue = Math.floor(Math.random() * 100);
            dataset.push(newValue); // Add it to the dataset
            xScale.domain(d3.range(dataset.length)); // Update xScale domain
            drawBars(dataset); // Redraw the bars with the new data
        });

    // Event listener for removing data
    d3.select("#removeButton")
        .on("click", function() {
            dataset.pop(); // Remove the last value from the dataset
            xScale.domain(d3.range(dataset.length)); // Update xScale domain
            drawBars(dataset); // Redraw the bars with the new data
        });

    // Event listener for easing with circle in effect
    d3.select("#easeCircleInButton")
        .on("click", function() {
            // Generate a new random number
            var newValue = Math.floor(Math.random() * 100);
            dataset.push(newValue); // Add it to the dataset
            xScale.domain(d3.range(dataset.length)); // Update xScale domain

            // Draw the bars with the new data using easeCircleIn effect
            svg.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", h)
                .attr("width", xScale.bandwidth())
                .attr("height", 0)
                .attr("fill", function(d) {
                    return d > 10 ? "red" : "black";
                })
                .transition()
                .duration(2000)
                .ease(d3.easeCircleIn)
                .attr("y", function(d) {
                    return yScale(d);
                })
                .attr("height", function(d) {
                    return h - yScale(d);
                });

            drawBars(dataset); // Redraw the bars with the new data
        });

    // Event listener for easing with elastic out effect
    d3.select("#easeElasticOutButton")
        .on("click", function() {
            // Generate a new random number
            var newValue = Math.floor(Math.random() * 100);
            dataset.push(newValue); // Add it to the dataset
            xScale.domain(d3.range(dataset.length)); // Update xScale domain

            // Draw the bars with the new data using easeElasticOut effect
            svg.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", h)
                .attr("width", xScale.bandwidth())
                .attr("height", 0)
                .attr("fill", function(d) {
                    return d > 10 ? "red" : "black";
                })
                .transition()
                .duration(2000)
                .ease(d3.easeElasticOut)
                .attr("y", function(d) {
                    return yScale(d);
                })
                .attr("height", function(d) {
                    return h - yScale(d);
                });

            drawBars(dataset); // Redraw the bars with the new data
        });
});
