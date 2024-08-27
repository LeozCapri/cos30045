
        // Function to create a bar chart for a single year
        function barChart(data, svg, w, h, yearKey) {
            var colorScale = d3.scaleThreshold()
                .domain([10, 20, 30])
                .range(["#b3cde0", "#6497b1", "#003f5c"]);

            // Create bars
            svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", function(d, i) { return i * (w / data.length); })
                .attr("y", function(d) { return h - (d[yearKey] * 4); })
                .attr("width", w / data.length - 1)
                .attr("height", function(d) { return d[yearKey] * 4; })
                .attr("fill", function(d) { return colorScale(d[yearKey]); });

            // Add labels
            svg.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .text(function(d) { return d[yearKey]; })
                .attr("x", function(d, i) { return i * (w / data.length) + (w / data.length) / 2; })
                .attr("y", function(d) { return h - (d[yearKey] * 4) - 2; })
                .attr("text-anchor", "middle")
                .attr("font-size", "12px")
                .attr("fill", "black");
        }

        // Function to create a grouped bar chart comparing both years
        function comparisonChart(data, svg, w, h) {
            var colorScale = d3.scaleOrdinal()
                .domain([2019, 2021])
                .range(["#6497b1", "#003f5c"]);

            var barWidth = w / data.length / 2 - 1;

            svg.selectAll(".bar2019")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar2019")
                .attr("x", function(d, i) { return i * (w / data.length); })
                .attr("y", function(d) { return h - (d.pets2019 * 4); })
                .attr("width", barWidth)
                .attr("height", function(d) { return d.pets2019 * 4; })
                .attr("fill", "#6497b1");

            svg.selectAll(".bar2021")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar2021")
                .attr("x", function(d, i) { return i * (w / data.length) + barWidth; })
                .attr("y", function(d) { return h - (d.pets2021 * 4); })
                .attr("width", barWidth)
                .attr("height", function(d) { return d.pets2021 * 4; })
                .attr("fill", "#003f5c");

            // Add labels for each group
            svg.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .text(function(d) { return d.pets2019 + " / " + d.pets2021; })
                .attr("x", function(d, i) { return i * (w / data.length) + barWidth; })
                .attr("y", function(d) { return h - Math.max(d.pets2019, d.pets2021) * 4 - 2; })
                .attr("text-anchor", "middle")
                .attr("font-size", "12px")
                .attr("fill", "black");
        }

        // Fetch data from CSV and initialize charts
        function init() {
            d3.csv("pet_ownership.csv").then(function(data) {
                // Convert pet counts to numbers
                console.log(data); // Log data to the console for debugging

                petOwnership = data;
                
                // Create the bar chart using the data
                barChart(petOwnership);
            });
        }

        // Call the init function when the window loads
        window.onload = init;

