function show(Image, ImgDesc, ImgAlt) {
  document.getElementById("ChartImg").src = Image;
  document.getElementById("ChartImg").alt = ImgAlt;
  document.getElementById("ChartCap").innerHTML = ImgDesc;
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
    "pets-ownership-2019.png",
    "Fig 1. 2019 Australian Pets Ownership Chart",
    "pets2019"
  );
  document.getElementById("btn2019").classList.add("btn-custom-active");
};

document.addEventListener("DOMContentLoaded", function () {
  const labExercises = [
    {
      title: "Lab 1.1: HTML and CSS Demo Page",
      link: "zaeem-lab1/lab1-1.html",
    },
    { title: "Lab 1.2: JavaScript", link: "zaeem-lab1/lab1-2.html" },
    { title: "Lab 1.3: Drawing SVGs", link: "zaeem-lab1/lab1-3.html" },
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
