const { body } = document;
let candidate: number[];
let array: number[] = [];
const MAX_CHANCES: number = 15;
let chance = MAX_CHANCES;
function chooseNumber() {
  candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  array = [];
  array.push(candidate.splice(Math.floor(Math.random() * 9), 1)[0]);
  for (let i: number = 0; i < 3; i++) {
    array.push(candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0]);
  }
}

function createRow(str1: string, str2: string, str3: string) {
  const row = document.createElement("tr");
  let column = document.createElement("td");
  column.textContent = str1;
  row.append(column);
  column = column = document.createElement("td");
  column.textContent = str2;
  row.append(column);
  column = column = document.createElement("td");
  column.textContent = str3;
  row.append(column);
  return row;
}

chooseNumber();
const form = document.createElement("form");
const question = document.createElement("h1");
question.textContent = "Guess Your Number";
form.append(question);
const count = document.createElement("h2");
count.textContent = `${chance} chance left`;
form.append(count);
const input = document.createElement("input");
form.append(input);
const button = document.createElement("button");
button.textContent = "Enter";
form.append(button);
const result = document.createElement("h2");
result.textContent = "";
form.append(result);

const results = document.createElement("table");
results.border = "2px solid black";
const caption = document.createElement("caption");
caption.textContent = "Results";
results.caption = caption;
results.append(createRow("Number", "Ball", "Strike"));
results.width = "400px";
form.append(results);
body.append(form);
const inputInitial = () => {
  input.value = "";
  input.focus();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (chance === MAX_CHANCES) {
    results.innerHTML = "";
    results.append(createRow("Number", "Ball", "Strike"));
  }
  const answer = input.value;
  if (answer.length !== 4 || isNaN(Number(answer))) {
    result.textContent = "Enter 4 digit number";
    inputInitial();
  } else {
    if (answer === array.join("")) {
      result.textContent = "Home Run!!!";
      chance = MAX_CHANCES;
      button.textContent = "New game";
      chooseNumber();
      inputInitial();
    } else {
      inputInitial();
      if (chance === 1) {
        count.textContent = `The answer was ${array.join("")}`;
        result.textContent = "Fail";
        chance = MAX_CHANCES;
        button.textContent = "New game";
        chooseNumber();
      } else {
        const answerArray = answer.split("");
        let strike: number = 0;
        let ball: number = 0;
        result.textContent = "";

        for (let i: number = 0; i < 4; ++i) {
          let num = Number(answerArray[i]);
          if (num === array[i]) ++strike;
          else if (array.indexOf(num) !== -1) ++ball;
        }
        results.append(createRow(answer, ball.toString(), strike.toString()));
        count.textContent =
          chance === 2 ? `${--chance} chance left` : `${--chance} chances left`;
      }
    }
  }
});
