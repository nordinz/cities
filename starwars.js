// GLOBAL VAR
const baseUrl = "https://swapi.py4e.com/api/";
const characters = document.querySelector(".characters");
let nextPage; //next page value
let previousPage; // pre page value

// NAVBAR
const hamburger = document.querySelector(".hamburger");
const navLink = document.querySelector(".nav__link");

hamburger.addEventListener("click", () => {
  navLink.classList.toggle("hide");
});
// STARWARSLOGO

let img = document.createElement("img");
img.src = "img/sw_logo.png";
document.querySelector(".img-container").appendChild(img);

// BUTTONS
const btnNext = document.querySelector("#btnNext");
const btnPrevious = document.querySelector("#btnPrevious");
btnNext.innerText = "next page";
btnPrevious.innerText = "previous page";

btnNext.addEventListener("click", () => {
  fetchValues(nextPage).then((data) => {
    printCharacters(data.results);
    savePageValue(data.previous, data.next);
  });
});

btnPrevious.addEventListener("click", () => {
  fetchValues(previousPage).then((data) => {
    printCharacters(data.results);
    savePageValue(data.previous, data.next);
  });
});

// FUNCTIONS
function fetchValues(url) {
  console.log(url);
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data) //returning data, instead of a "return data"
    .catch((err) => console.log(err));
}

function printCharacters(characters) {
  const ul = document.querySelector(".character-list");
  ul.innerHTML = "";
  for (let i = 0; i < characters.length; i++) {
    let li = document.createElement("li");
    li.innerText = characters[i].name;
    li.addEventListener("click", () => printCharacterInfo(characters[i]));
    ul.appendChild(li);
  }
}

function printCharacterInfo(character) {
  const characterInfo = document.querySelector(".character-info");
  characterInfo.innerHTML = `
 
    <p>Name: ${character.name}</p>
    <p>Height: ${character.height}</p>
    <p>Mass: ${character.mass}</p>
    <p>Hair color: ${character.hair_color}</p>
    <p>Skin color: ${character.skin_color}</p>
    <p>Eye color: ${character.eye_color}</p>
    <p>Birth year: ${character.birth_year}</p>
    <p>Gender: ${character.gender}</p>
  `;
}

function savePageValue(preValue, nextValue) {
  // saves the nextpage/prepage value to var
  nextPage = nextValue;
  previousPage = preValue;
  if (nextPage === null) {
    btnNext.disabled = true;
  } else {
    btnNext.disabled = false;
  }
  if (previousPage === null) {
    btnPrevious.disabled = true;
  } else {
    btnPrevious.disabled = false;
  }
}

function main() {
  // fetches baseurl of api and calls on printCharacters
  fetchValues(baseUrl + "people").then((data) => {
    printCharacters(data.results);
    savePageValue(data.previous, data.next); // saves the nextpage/prepage value
  });
}
main();
