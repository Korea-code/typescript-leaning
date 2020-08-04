"use strict";
var table = document.createElement("table");
var rows = [];
var cells = [];
var turn = "X";
var result = document.createElement("div");
function toggleTurn() {
    turn = turn === "O" ? "X" : "O";
}
function callback(event) {
    var targetCell = event.currentTarget;
    var rowIndex = rows.indexOf(targetCell.parentNode);
    var columnIndex = cells[rowIndex].indexOf(targetCell);
    if (targetCell.textContent === "") {
        targetCell.textContent = turn;
        targetCell.style.cursor = "default";
        targetCell.removeEventListener("click", callback);
    }
    if ((cells[rowIndex][0].textContent === turn &&
        cells[rowIndex][1].textContent === turn &&
        cells[rowIndex][2].textContent === turn) ||
        (cells[0][columnIndex].textContent === turn &&
            cells[1][columnIndex].textContent === turn &&
            cells[2][columnIndex].textContent === turn) ||
        (cells[0][0].textContent === turn &&
            cells[1][1].textContent === turn &&
            cells[2][2].textContent === turn) ||
        (cells[2][0].textContent === turn &&
            cells[1][1].textContent === turn &&
            cells[0][2].textContent === turn)) {
        result.textContent = turn + " Win";
        var button = document.createElement("button");
        button.textContent = "Replay";
        button.addEventListener("click", drawMap);
        result.append(button);
    }
    toggleTurn();
}
function initalize() {
    table.innerHTML = "";
    rows = [];
    cells = [];
    turn = "X";
    result.textContent = "";
}
function drawMap() {
    initalize();
    for (var i = 0; i < 3; i++) {
        var row = document.createElement("tr");
        rows.push(row);
        cells.push([]);
        for (var j = 0; j < 3; j++) {
            var cell = document.createElement("td");
            cell.style.cursor = "pointer";
            cell.addEventListener("click", callback);
            cells[i].push(cell);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    document.body.appendChild(table);
    document.body.appendChild(result);
}
drawMap();
