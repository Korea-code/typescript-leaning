const HORIZONTAL: number = 4;
const VERTICAL: number = 3;
const SPACE: number = HORIZONTAL * VERTICAL;
enum Color {
  RED = "#e74c3c",
  ORANGE = "#f39c12",
  GREEN = "#2ecc71",
  YELLOW = "#f1c40f",
  WHITE = "#ecf0f1",
  PURPLE = "#9b59b6",
}

const colors: Color[] = [
  Color.RED,
  Color.RED,
  Color.ORANGE,
  Color.ORANGE,
  Color.YELLOW,
  Color.YELLOW,
  Color.WHITE,
  Color.WHITE,
  Color.PURPLE,
  Color.PURPLE,
  Color.GREEN,
  Color.GREEN,
];

let colorCandidate: Color[] = colors.slice();
let color: Color[] = [];
let clickFlag: boolean = true;
let clickedCard: HTMLDivElement[] = [];
let completedCard: HTMLDivElement[] = [];
let startTime: number;
let endTime: number;

function shuffle() {
  if (SPACE !== colorCandidate.length)
    throw Error("Miss matching between space's and card's number");
  for (let i: number = 0; i < SPACE; i++) {
    color = color.concat(
      colorCandidate.splice(
        Math.floor(Math.random() * colorCandidate.length),
        1,
      ),
    );
  }
}
function createCards(space: number) {
  for (let i: number = 0; i < space; i++) {
    const card: HTMLDivElement = document.createElement("div");
    card.className = "card";
    const cardInner: HTMLDivElement = document.createElement("div");
    cardInner.className = "card-inner";
    const cardFront: HTMLDivElement = document.createElement("div");
    cardFront.className = "card-front";
    const cardBack: HTMLDivElement = document.createElement("div");
    cardBack.className = "card-back";
    cardBack.style.backgroundColor = color[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    card.addEventListener("click", function (this: HTMLDivElement) {
      if (!completedCard.includes(this) && !clickedCard.includes(this)) {
        this.classList.toggle("flipped");
        clickedCard.push(this);
        if (clickedCard.length === 2) {
          const firstBackground: string = (clickedCard[0].querySelector(
            ".card-back",
          ) as HTMLDivElement).style.backgroundColor;
          const secondBackground: string = (clickedCard[1].querySelector(
            ".card-back",
          ) as HTMLDivElement).style.backgroundColor;
          if (firstBackground === secondBackground) {
            completedCard.push(clickedCard[0]);
            completedCard.push(clickedCard[1]);
            clickedCard = [];
            if (completedCard.length === space) {
              endTime = new Date().getTime();
              alert(
                `Congrats! Your record is ${(endTime - startTime) / 1000} sec`,
              );
              document.querySelector("#wrapper")!.innerHTML = "";
              colorCandidate = colors.slice();
              color = [];
              clickedCard = [];
              completedCard = [];
              startTime;
              endTime;
              shuffle();
              setCard(SPACE);
            }
          } else {
            setTimeout(() => {
              clickedCard[0].classList.remove("flipped");
              clickedCard[1].classList.remove("flipped");
              clickedCard = [];
            }, 700);
          }
        }
      }
    });
    (document.querySelector("#wrapper") as HTMLDivElement).appendChild(card);
  }
}
function showAllCards(space: number) {
  document.querySelectorAll(".card").forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("flipped");
    }, 700 + 100 * index);
  });
  setTimeout(() => {
    document.querySelectorAll(".card").forEach((card, index) => {
      card.classList.remove("flipped");
    });
  }, 5000);
}
function setCard(space: number) {
  clickFlag = false;
  createCards(space);
  showAllCards(space);

  startTime = new Date().getTime();
}
shuffle();
setCard(SPACE);
