let numberOne = Math.ceil(Math.random() * 9);
let numberTwo = Math.ceil(Math.random() * 9);
let result = numberOne * numberTwo;

const word = document.createElement("div");
word.textContent = `${numberOne} * ${numberTwo}`;
document.body.append(word);

const form = document.createElement("form");
document.body.append(form);

const input = document.createElement("input");
form.append(input);

const button = document.createElement("button");
button.textContent = "Enter";

form.append(button);

const resultDiv = document.createElement("div");
document.body.append(resultDiv);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (result === Number(input.value)) {
    resultDiv.textContent = "Correct";
    numberOne = Math.ceil(Math.random() * 9);
    numberTwo = Math.ceil(Math.random() * 9);
    result = numberOne * numberTwo;
    word.textContent = `${numberOne} * ${numberTwo}`;
    input.value = "";
    input.focus();
  } else {
    resultDiv.textContent = "Worng answer";
    input.value = "";
    input.focus();
  }
});
