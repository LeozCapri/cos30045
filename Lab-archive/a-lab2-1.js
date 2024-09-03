// d3.select("body").append("p").text("New Paragraph!");

// var dataset = [14, 5, 26, 23, 9];

// d3.select("body")
//   .selectAll("p")
//   .data(dataset)
//   .enter()
//   .append("p")
//   .text("New Paragraph!");

// var dataset = [14, 5, 26, 23, 9];

// d3.select("body")
//   .selectAll("p")
//   .data(dataset)
//   .enter()
//   .append("p")
//   .text(function (d) {
//     return d;
//   });

// var dataset = [14, 5, 26, 23, 9];
// var color1 = d3.color("red");

// d3.select("body")
//   .selectAll("p")
//   .data(dataset)
//   .enter()
//   .append("p")
//   .style("color", function (d) {
//     if (d > 10) {
//       return "red";
//     } else {
//       return "black"; // Set a default color for values <= 10
//     }
//   })
//   .text(function (d) {
//     if (d > 10) {
//       return "Warning: James watched " + d + " cat videos today.";
//     } else {
//       return "James watched " + d + " cat videos today.";
//     }
//   });
