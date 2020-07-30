var body = document.body;
var candidate;
var array = [];
var MAX_CHANCES = 15;
var chance = MAX_CHANCES;
function chooseNumber() {
    candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    array = [];
    array.push(candidate.splice(Math.floor(Math.random() * 9), 1)[0]);
    for (var i = 0; i < 3; i++) {
        array.push(candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0]);
    }
}
function createRow(str1, str2, str3) {
    var row = document.createElement("tr");
    var column = document.createElement("td");
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
var form = document.createElement("form");
var question = document.createElement("h1");
question.textContent = "Guess Your Number";
form.append(question);
var count = document.createElement("h2");
count.textContent = chance + " chance left";
form.append(count);
var input = document.createElement("input");
form.append(input);
var button = document.createElement("button");
button.textContent = "Enter";
form.append(button);
var result = document.createElement("h2");
result.textContent = "";
form.append(result);
var results = document.createElement("table");
results.border = "2px solid black";
var caption = document.createElement("caption");
caption.textContent = "Results";
results.caption = caption;
results.append(createRow("Number", "Ball", "Strike"));
results.width = "400px";
form.append(results);
body.append(form);
var inputInitial = function () {
    input.value = "";
    input.focus();
};
form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (chance === MAX_CHANCES) {
        results.innerHTML = "";
        results.append(createRow("Number", "Ball", "Strike"));
    }
    var answer = input.value;
    if (answer.length !== 4 || isNaN(Number(answer))) {
        result.textContent = "Enter 4 digit number";
        inputInitial();
    }
    else {
        if (answer === array.join("")) {
            result.textContent = "Home Run!!!";
            chance = MAX_CHANCES;
            button.textContent = "New game";
            chooseNumber();
            inputInitial();
        }
        else {
            inputInitial();
            if (chance === 1) {
                count.textContent = "The answer was " + array.join("");
                result.textContent = "Fail";
                chance = MAX_CHANCES;
                button.textContent = "New game";
                chooseNumber();
            }
            else {
                var answerArray = answer.split("");
                var strike = 0;
                var ball = 0;
                result.textContent = "";
                for (var i = 0; i < 4; ++i) {
                    var num = Number(answerArray[i]);
                    if (num === array[i])
                        ++strike;
                    else if (array.indexOf(num) !== -1)
                        ++ball;
                }
                results.append(createRow(answer, ball.toString(), strike.toString()));
                count.textContent =
                    chance === 2 ? --chance + " chance left" : --chance + " chances left";
            }
        }
    }
});
