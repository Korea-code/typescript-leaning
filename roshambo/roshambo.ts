interface RSP {
  readonly ROCK: "0";
  readonly SCISSORS: "-142px";
  readonly PAPER: "-284px";
}

let imgCoords: RSP[keyof RSP] = "0";

const rsp: RSP = {
  ROCK: "0",
  SCISSORS: "-142px",
  PAPER: "-284px",
};

const score = {
  ROCK: 0,
  SCISSORS: 1,
  PAPER: -1,
} as const;

function computerChoice(imgCoords: RSP[keyof RSP]): keyof RSP {
  return (Object.keys(rsp) as ["ROCK", "SCISSORS", "PAPER"]).find(
    (k) => rsp[k] === imgCoords
  )!;
}

let interval: number;
let preInterval: number = -1;
let winCount: number = 0;
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (this: HTMLButtonElement, e: Event) {
    if (interval !== preInterval) {
      preInterval = interval;
      clearInterval(interval);
      setTimeout(intervalMaker, 1500);
      const myChoice = this.textContent as keyof RSP;
      const me = document.querySelector("#me");
      if (me)
        (me as HTMLDivElement).style.background = `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${rsp[myChoice]} 0`;
      const myScore = score[myChoice];
      const computerScore = score[computerChoice(imgCoords)];
      const diff = myScore - computerScore;
      if (diff === 0) {
        console.log("tie");
      } else if ([-1, 3].indexOf(diff) !== -1) {
        console.log("win");
        ++winCount;
      } else {
        console.log("lose");
        --winCount;
      }
      document.querySelector(
        "#winCount"
      )!.textContent = `Your Score is ${winCount}`;
    }
  });
});

function intervalMaker() {
  interval = setInterval(function () {
    if (imgCoords === rsp.ROCK) {
      imgCoords = rsp.SCISSORS;
    } else if (imgCoords === rsp.SCISSORS) {
      imgCoords = rsp.PAPER;
    } else {
      imgCoords = rsp.ROCK;
    }
    const computer = document.querySelector("#computer");
    if (computer)
      (computer as HTMLDivElement).style.background = `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoords} 0`;
  }, 100);
}
intervalMaker();
