const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole;
let timeUp = false;
let score = 0;
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}
function classChanger() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");
  const mole = hole.querySelector(".mole");
  mole.removeEventListener("click", addScore);

  mole.classList.add("up");
  setTimeout(() => {
    mole.classList.remove("up");
    mole.addEventListener("click", addScore, { once: true });

    if (!timeUp) classChanger();
  }, time);
}
function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  classChanger();
  setTimeout(() => (timeUp = true), 10000);
}
function addScore(e) {
  if (!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}
moles.forEach((mole) =>
  mole.addEventListener("click", addScore, { once: true })
);
