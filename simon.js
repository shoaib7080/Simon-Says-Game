let gameSeq = [];
let userSeq = [];
let btns = ["red", "yel", "gre", "blu"];
scores = [];

let started = false;
let level = 0;
let lvl = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game Started");
    started = true;

    lvlUp();
  }
});

function flash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 200);
}
function uFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 200);
}

function lvlUp() {
  userSeq = [];
  level++;
  lvl.innerText = `Level ${level}`;

  let rndm = Math.floor(Math.random() * 3);
  // console.log(rndm);
  let rndmclr = btns[rndm];
  let rndbtn = document.querySelector(`.${rndmclr}`);
  flash(rndbtn);
  gameSeq.push(rndmclr);
  console.log(gameSeq);
}

function matchAns(idx) {
  console.log("Current level is " + level);
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(lvlUp, 1000);
    }
    // console.log("Same same");
    // console.log(userSeq[idx]);
  } else {
    let score = level - 1;
    lvl.innerHTML = `Game over! Your score was <b>${score}</b><br>Press any key again...`;
    scores.push(score);
    document.querySelector("body").style.background = "red";
    setTimeout(() => {
      document.querySelector("body").style.background = "	#080808";
    }, 150);
    reset();
  }
}

function btnPress() {
  // console.log("Button was pressed");
  uFlash(this);
  let userClr = this.getAttribute("id");
  // console.log(userClr);
  userSeq.push(userClr);
  console.log(userSeq);
  matchAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".bnt");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  userSeq = [];
  gameSeq = [];
  started = false;
  level = 0;
  max(scores);
}

function max(ele) {
  let maxscr = Math.max(...ele);
  let max = document.querySelector("#maxscore");
  max.innerText = `Max score is ${maxscr}`;
}
