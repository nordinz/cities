// NAVBAR
const hamburger = document.querySelector(".hamburger");
const navLink = document.querySelector(".nav__link");

hamburger.addEventListener("click", () => {
  navLink.classList.toggle("hide");
});

let nextPage;
let previousPage;

//RICK AND MORTY LOGO
let img = document.createElement("img");
img.src = "img/rm_logo.png";
document.querySelector(".img-container").appendChild(img);

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

fetch("https://rickandmortyapi.com/api/character")
  .then((response) => response.json())
  .then((data) => {
    printCharacter(data.results);
    savePageValue(data.info.prev, data.info.next);
  });

function printCharacter(characters) {
  let ul = document.querySelector(".character-list");
  ul.innerHTML = "";
  for (let i = 0; i < characters.length; i++) {
    let li = document.createElement("li");
    li.innerText = characters[i].name;
    ul.appendChild(li);
    li.addEventListener("click", () => characterInfo(characters[i]));
  }
}

function characterInfo(character) {
  let characterInfo = document.querySelector(".character-info");
  characterInfo.innerHTML = `
  <div class:"img-container"><img src="https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg"</div>
  <p>Name: ${character.name}</p>
  <p>Species: ${character.species}</p>
  <p>Status: ${character.status}</p>
  <p>Location: ${character.location.name}</p>
  <p>Gender: ${character.gender}</p>
  `;
}

// BUTTONS
const btnNext = document.querySelector("#btnNext");
const btnPrevious = document.querySelector("#btnPrevious");

btnNext.innerText = "Next Page";
btnNext.addEventListener("click", () => {
  fetchValues(nextPage).then((data) => {
    printCharacter(data.results);
    savePageValue(data.info.prev, data.info.next);
  });
});

btnPrevious.innerText = "Previous Page";
btnPrevious.addEventListener("click", () => {
  fetchValues(previousPage);
  fetchValues(previousPage).then((data) => {
    printCharacter(data.results);
    savePageValue(data.info.prev, data.info.next);
  });
});

// Get values from api- url
function fetchValues(url) {
  console.log(url);
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data) //returning data, instead of a "return data"
    .catch((err) => console.log(err));
}
