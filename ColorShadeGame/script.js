const container = document.getElementById("game-container");
const scoreElement = document.getElementById("score");
const highscoreTable = document.getElementById("highscore-table");
let score = 0;

function getRandomColor() {
  const r = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
  return { r, g, b };
}

function rgbToStr({ r, g, b }) {
  return `rgb(${r}, ${g}, ${b})`;
}

function startRound() {
  container.innerHTML = '';
  const size = 16; // 4x4 grid
  const diff = 30 - Math.min(score * 2, 25); // Zmniejsz różnicę wraz z wynikiem
  const baseColor = getRandomColor();
  const specialColor = {
    r: baseColor.r + diff,
    g: baseColor.g + diff,
    b: baseColor.b + diff
  };

  const differentIndex = Math.floor(Math.random() * size);

  for (let i = 0; i < size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    if (i === differentIndex) {
      square.style.backgroundColor = rgbToStr(specialColor);
      square.addEventListener("click", () => {
        score++;
        updateScore();
        startRound();
      });
    } else {
      square.style.backgroundColor = rgbToStr(baseColor);
      square.addEventListener("click", () => {
        alert("Zła odpowiedź! Twój wynik: " + score);
        updateHighscore(score);
        score = 0;
        updateScore();
        startRound();
      });
    }
    container.appendChild(square);
  }
}

function updateScore() {
  scoreElement.textContent = "Wynik: " + score;
}

function updateHighscore(currentScore) {
  let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
  if (highscores.length < 5) {
    highscores.push(currentScore);
  } else {
    highscores.push(currentScore);
    highscores.sort((a, b) => b - a);
    highscores = highscores.slice(0, 5);
  }

  localStorage.setItem('highscores', JSON.stringify(highscores));
  displayHighscores();
}

function displayHighscores() {
  let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
  highscores.sort((a, b) => b - a);

  highscoreTable.innerHTML = `
    <tr>
      <th>Pozycja</th>
      <th>Wynik</th>
    </tr>
  `;

  highscores.forEach((score, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${index + 1}</td><td>${score}</td>`;
    highscoreTable.appendChild(row);
  });
}

displayHighscores();
startRound();