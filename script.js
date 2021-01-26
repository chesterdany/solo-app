const jucatori = [];
const startDiv = document.getElementById("startDiv");
const inputButton = document.getElementById("okButton");
const startGame = document.getElementById("startGame");
const addScore = document.getElementById("scoreAdd");
const tabel = document.getElementById("tabel");
const looser = document.getElementById("selector");
const newGame = document.getElementById("newGame");

inputButton.addEventListener("click", colectPlayers);
startGame.addEventListener("click", renderNames);
addScore.addEventListener("click", renderNewScores);
newGame.addEventListener("click", restartGame);

function restartGame() {
  window.location.reload();
}

function colectPlayers() {
  let inputName = document.getElementById("inputNames").value;
  if (inputName) {
    // inputButton.classList.remove("disabled");
    const player = new Player(inputName, 0);
    jucatori.push(player);
    document.getElementById("inputNames").value = "";
  }
}

function renderNames() {
  if (jucatori.length > 0) {
    const headerRow = document.createElement("tr");
    const scoreRow = document.createElement("tr");
    jucatori.forEach((p) => {
      const headerRowElement = document.createElement("th");
      headerRowElement.innerText = p.Name;
      headerRow.append(headerRowElement);
      tabel.append(headerRow);
      const scoreRowElement = document.createElement("td");
      scoreRowElement.innerText = p.Score;
      scoreRow.append(scoreRowElement);
      tabel.append(scoreRow);
    });
    startDiv.classList.add("invisible");
    addScore.classList.remove("invisible");
    newGame.classList.remove("invisible");
  }
}

function renderNewScores() {
  const newScoresRow = document.createElement("tr");

  for (const p of jucatori) {
    const newScores = parseInt(prompt("Score nou pt. " + p.Name));
    if (isNaN(newScores)) {
      alert("Scorul are numai NUMERE!!!ALOO!!");
      break;
    }
    p.Score += newScores;
    const newScoreElement = document.createElement("td");
    newScoreElement.innerText = p.Score;
    newScoresRow.append(newScoreElement);
    tabel.append(newScoresRow);
  }
  checkWinner();
}

function checkWinner() {
  jucatori.forEach((p) => {
    if (p.Score > parseInt(looser.value)) {
      alert(p.Name + " a pierdut!!");
      const loosercolor = document.querySelectorAll("th");
      loosercolor.forEach((e) => {
        if (e.innerHTML === p.Name) {
          e.classList.add("red");
        }
      });
    } else if (p.Score == parseInt(looser.value)) {
      alert(p.Name + " a castigat la bingo!!");
      p.Score = 0;
      const loosercolor = document.querySelectorAll("th");
      loosercolor.forEach((e) => {
        if (e.innerHTML === p.Name) {
          e.classList.add("blue");
        }
      });
    }
  });
}

class Player {
  constructor(name, score) {
    (this.Name = name), (this.Score = score);
  }
}
