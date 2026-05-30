const timerText =
document.getElementById("timer");

let timer;

let timeLeft = 8;
const grid = document.getElementById("grid");

let level = 1;
let score = 0;

function randomColor() {

  return {

    r: Math.floor(Math.random() * 180),

    g: Math.floor(Math.random() * 180),

    b: Math.floor(Math.random() * 180)
  };
}

function createLevel() {

  grid.innerHTML = "";
  clearInterval(timer);

timeLeft = 8;

timerText.textContent =
`Time: ${timeLeft}s`;
  // GRID SIZE INCREASES
  let size = Math.min(
    2 + Math.floor(level / 2),
    10
  );

  let totalTiles = size * size;

  // UPDATE GRID
  grid.style.gridTemplateColumns =
  `repeat(${size}, 1fr)`;

  // BASE COLOR
  const base = randomColor();

  // DIFFERENCE BECOMES HARDER
  const diff =
  Math.max(45 - level * 1.2, 10);

  // ODD COLOR
  const odd = {

    r: Math.min(base.r + diff, 255),

    g: Math.min(base.g + diff, 255),

    b: Math.min(base.b + diff, 255)
  };

  // RANDOM ODD TILE
  const oddTile =
  Math.floor(Math.random() * totalTiles);
  timer = setInterval(() => {

  timeLeft--;

  timerText.textContent =
  `Time: ${timeLeft}s`;

  if (timeLeft <= 0) {

    clearInterval(timer);

    let scores =
    JSON.parse(
      localStorage.getItem("scores")
    ) || [];

    scores.push(score);

    scores.sort((a,b) => b - a);

    scores = scores.slice(0,100);

    localStorage.setItem(
      "scores",
      JSON.stringify(scores)
    );

    const rank =
    scores.indexOf(score) + 1;

    alert(
      `TIME UP!\n\nScore: ${score}\nRank: #${rank}`
    );

    level = 1;
    score = 0;

    createLevel();
  }

}, 1000);

  // CREATE TILES
  for (let i = 0; i < totalTiles; i++) {

    const tile =
    document.createElement("div");

    tile.classList.add("tile");

    // COLORS
    if (i === oddTile) {

      tile.style.background =
      `rgb(${odd.r},${odd.g},${odd.b})`;

    } else {

      tile.style.background =
      `rgb(${base.r},${base.g},${base.b})`;
    }

    // CLICK
    tile.addEventListener("click", () => {

      if (i === oddTile) {

        score++;
        level++;

        createLevel();

      } else {
        clearInterval(timer);
        let scores =
JSON.parse(
  localStorage.getItem("scores")
) || [];

// SAVE CURRENT SCORE
scores.push(score);

// SORT HIGHEST FIRST
scores.sort((a,b) => b - a);

// KEEP TOP 100
scores = scores.slice(0,100);

// SAVE SCORES
localStorage.setItem(
  "scores",
  JSON.stringify(scores)
);

// FIND PLAYER RANK
const rank =
scores.indexOf(score) + 1;

alert(
  `GAME OVER\n\nScore: ${score}\nRank: #${rank}`
);

level = 1;
score = 0;

createLevel();

        createLevel();
      }
    });

    grid.appendChild(tile);
  }
}

createLevel();