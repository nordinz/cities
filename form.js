// NAVBAR
const hamburger = document.querySelector(".hamburger");
const navLink = document.querySelector(".nav__link");

hamburger.addEventListener("click", () => {
  navLink.classList.toggle("hide");
});
// CITIES FORM/FUNCTIONS
let nextPage;
let previousPage;

const cityIdInput = document.querySelector("#city-id");
const body = document.body;

function getData(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

function printCityInfo(city) {
  const cityInfo = document.querySelector(".city-info");
  cityInfo.innerHTML = `

    
    <p>Name: ${city.name}</p>
    <p>Population: ${city.population}</p>
    <p>Id: ${city.id}</p>
    <button id="delete-button" class="btn">DELETE SELECTED CITY</button>
  `;
  cityIdInput.value = city.id;
  document.querySelector("#delete-button").addEventListener("click", () => {
    fetch(`https://avancera.app/cities/${city.id}`, {
      method: "DELETE",
    }).then((response) => {
      location.reload();
    });
  });
}
// BUTTONS
function printCities(citiesArray) {
  console.log(citiesArray);
  const ul = document.querySelector(".city-list");
  ul.innerHTML = "";
  for (let i = 0; i < citiesArray.length; i++) {
    let li = document.createElement("li");
    li.innerText = citiesArray[i].name;
    li.addEventListener("click", () => printCityInfo(citiesArray[i]));
    ul.appendChild(li);
  }
}

const postButton = document.querySelector("#post-button");
postButton.addEventListener("click", (event) => {
  event.preventDefault();
  const inputs = {
    name: document.querySelector("#city-name").value,
    population: +document.querySelector("#city-population").value,
  };
  fetch("https://avancera.app/cities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  })
    .then((res) => res.json())
    .then((data) => printCities(data));
});

const patchButton = document.querySelector("#patch-button");
patchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const inputs = {
    name: document.querySelector("#city-name").value,
    population: +document.querySelector("#city-population").value,
  };

  fetch(`https://avancera.app/cities/${cityIdInput.value}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  }).then((res) => location.reload());
});

//CHART

async function createChart() {
  const data = await getChartData();
  const ctx = document.getElementById("myChart").getContext("2d");

  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.cityNameX,

      datasets: [
        {
          label: "Top 15 most populated cities in the world",
          data: data.cityPopY,

          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      color: "white",
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "white",
            font: {
              weight: "bold",
            },
          },
        },
        x: {
          ticks: {
            color: "white",
            font: {
              weight: "bold",
            },
          },
        },
      },
    },
  });
}

async function getChartData() {
  const cityNameX = [];
  const cityPopY = [];
  const response = await fetch(
    "geonames-all-cities-with-a-population-1000 (1).csv"
  );
  const data = await response.text();

  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const columns = row.split(";");
    const chartCity = columns[1];
    cityNameX.push(chartCity);
    const population = columns[3];
    cityPopY.push(population);
    // console.log(chartCity, population);
  });
  return { cityNameX, cityPopY };
}

//MAIN FUNCTION - START
function main() {
  getData("https://avancera.app/cities").then((data) => {
    printCities(data);
    createChart();
  });
}
main();
