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

    // Create bars for the initial dataset
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return h - yScale(d);
        })
        .attr("fill", function(d) {
            return d > 10 ? "red" : "black";
        });

    // Create labels for the initial dataset
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d;
        })
        .attr("fill", "white")
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
            return yScale(d) + 14;
        })
        .attr("text-anchor", "middle");

    // Add x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + h + ")")
        .call(d3.axisBottom(xScale).tickFormat((d, i) => i + 1)); // Custom tick format for ordinal data

    // Add y-axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)")
        .call(d3.axisLeft(yScale));

    // Function to update the dataset with new data and apply transitions
    function updateData(newData, easeFunction = d3.easeCubicInOut, duration = 2000, delay = 0) {
        // Update scales
        yScale.domain([0, d3.max(newData)]);

        // Select all bars and update their data
        svg.selectAll("rect")
            .data(newData)
            .transition()
            .delay((d, i) => i * delay)
            .duration(duration)
            .ease(easeFunction)
            .attr("y", function(d) {
                return yScale(d);
            })
            .attr("height", function(d) {
                return h - yScale(d);
            })
            .attr("fill", function(d) {
                return d > 10 ? "red" : "black";
            });

        // Select all labels and update their data
        svg.selectAll("text")
            .data(newData)
            .transition()
            .delay((d, i) => i * delay)
            .duration(duration)
            .ease(easeFunction)
            .text(function(d) {
                return d;
            })
            .attr("y", function(d) {
                return yScale(d) + 14;
            });

        // Update y-axis
        svg.select(".y.axis")
            .transition()
            .duration(duration)
            .ease(easeFunction)
            .call(d3.axisLeft(yScale));
    }

    // Event listener for button to update data with a new static dataset
    d3.select("#updateButton")
        .on("click", function() {
            // Generate new random dataset
            var newData = Array.from({ length: dataset.length }, () => Math.floor(Math.random() * 25));
            updateData(newData, d3.easeCubicInOut, 2000, 100);
        });

    // Event listener for Ease Circle In button
    d3.select("#easeCircleInButton")
        .on("click", function() {
            var newData = Array.from({ length: dataset.length }, () => Math.floor(Math.random() * 25));
            updateData(newData, d3.easeCircleIn, 2000, 100);
        });

    // Event listener for Ease Elastic Out button
    d3.select("#easeElasticOutButton")
        .on("click", function() {
            var newData = Array.from({ length: dataset.length }, () => Math.floor(Math.random() * 25));
            updateData(newData, d3.easeElasticOut, 2000, 100);
        });
});
