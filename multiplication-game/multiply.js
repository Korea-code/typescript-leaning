var numberOne = Math.ceil(Math.random() * 9);
var numberTwo = Math.ceil(Math.random() * 9);
var result = numberOne * numberTwo;
var word = document.createElement("div");
word.textContent = numberOne + " * " + numberTwo;
document.body.append(word);
var form = document.createElement("form");
document.body.append(form);
var input = document.createElement("input");
form.append(input);
var button = document.createElement("button");
button.textContent = "Enter";
form.append(button);
var resultDiv = document.createElement("div");
document.body.append(resultDiv);
form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (result === Number(input.value)) {
        resultDiv.textContent = "Correct";
        numberOne = Math.ceil(Math.random() * 9);
        numberTwo = Math.ceil(Math.random() * 9);
        result = numberOne * numberTwo;
        word.textContent = numberOne + " * " + numberTwo;
        input.value = "";
        input.focus();
    }
    else {
        resultDiv.textContent = "Worng answer";
        input.value = "";
        input.focus();
    }
});
