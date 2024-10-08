function show(Image, ImgDesc, ImgAlt) {
  // Update the image source and alternate text
  document.getElementById("ChartImg").src = Image;
  document.getElementById("ChartImg").alt = ImgAlt;

  // Update the image description
  document.getElementById("ChartCap").innerHTML = ImgDesc;

  // Make sure the image is displayed
  document.getElementById("ChartImg").style.display = "block";

  // Remove active class from all buttons
  document.getElementById("btn2019").classList.remove("btn-custom-active");
  document.getElementById("btn2021").classList.remove("btn-custom-active");
  document.getElementById("btnBoth").classList.remove("btn-custom-active");

  // Add active class to the correct button
  if (ImgAlt === "pets2019") {
      document.getElementById("btn2019").classList.add("btn-custom-active");
  } else if (ImgAlt === "pets2021") {
      document.getElementById("btn2021").classList.add("btn-custom-active");
  } else if (ImgAlt === "pets2019and2021") {
      document.getElementById("btnBoth").classList.add("btn-custom-active");
  }
}

// Load default chart
window.onload = function () {
  show(
      "../src/img/pets-ownership-2019.png",
      "Fig 1. 2019 Australian Pets Ownership Chart",
      "pets2019"
  );
  document.getElementById("btn2019").classList.add("btn-custom-active");
};


// Highlight active navigation link
document.addEventListener("DOMContentLoaded", function () {
  // Get the current URL path
  var currentPath = window.location.pathname;

  // Get all navigation links
  var navLinks = document.querySelectorAll(".mt-4 a");

  navLinks.forEach(function (link) {
      // Construct absolute path from relative href
      var linkPath = new URL(link.getAttribute("href"), window.location.origin).pathname;

      // Check if the href matches the current path
      if (linkPath === currentPath) {
          link.classList.add("active");
      }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const labExercises = [
    { title: "Lab 1.1: HTML and CSS Demo Page", link: "/zaeem-lab1/lab1-1.html"},
    { title: "Lab 1.2: JavaScript", link: "/zaeem-lab1/lab1-2.html" },
    { title: "Lab 1.3: Drawing SVGs", link: "/zaeem-lab1/lab1-3.html" },
    { title: "LAB 2.1 D3 Drawing with Data - Binding", link: "/zaeem-lab2/lab2-1.html" },
    { title: "LAB 2.2 D3 Drawing with Data - Bar Chart", link: "/zaeem-lab2/lab2-2.html" },
    { title: "LAB 2.3 D3 Drawing with Data - Scatter Plot", link: "/zaeem-lab2/lab2-3.html" },
    { title: "LAB 2.4 D3 Loading Data from CSV", link: "/zaeem-lab2/lab2-4.html" },
    { title: "LAB 3.1 D3 Scaling your Charts", link: "/zaeem-lab3/lab3-1.html" },
    { title: "LAB 3.2 Adding Axis to your Charts", link: "/zaeem-lab3/lab3-2.html" },
    { title: "LAB 5.1 D3 Updates", link: "/zaeem-lab5/lab5-1.html" },
    { title: "LAB 5.2 D3 Transitions", link: "/zaeem-lab5/lab5-2.html" },
    { title: "LAB 5.3 D3 Adding and Removing Data", link: "/zaeem-lab5/lab5-3.html" },
    { title: "LAB 6.1 D3 Interactivity - Mouse Over Effects", link: "/zaeem-lab6/lab6-1.html" },
    { title: "LAB 6.2 D3 Interactivity - Mouse Over Effects and Sort", link: "/zaeem-lab6/lab6-2.html" },
    // Add more exercises as needed
  ];

  const cardContainer = document.getElementById("lab-cards-container");

  labExercises.forEach((exercise) => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
                <div class="card exercise-card">
                    <div class="card-body">
                        <h5 class="card-title">${exercise.title}</h5>
                        <a href="${exercise.link}" class="btn btn-primary">View Exercise</a>
                    </div>
                </div>
            `;

    cardContainer.appendChild(card);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the current URL path
  var currentPath = window.location.pathname;

  // Get all navigation links
  var navLinks = document.querySelectorAll(".mt-4 a");

  navLinks.forEach(function (link) {
    // Construct absolute path from relative href
    var linkPath = new URL(link.getAttribute("href"), window.location.origin)
      .pathname;

    // Check if the href matches the current path
    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });
});
