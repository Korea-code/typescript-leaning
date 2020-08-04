const table: HTMLTableElement = document.createElement("table");
let rows: HTMLTableRowElement[] = [];
let cells: HTMLTableCellElement[][] = [];

let turn: "O" | "X" = "X";
let result: HTMLDivElement = document.createElement("div");

function toggleTurn() {
  turn = turn === "O" ? "X" : "O";
}

function callback(event: MouseEvent) {
  const targetCell = event.currentTarget as HTMLTableCellElement;
  const rowIndex: number = rows.indexOf(
    targetCell.parentNode as HTMLTableRowElement,
  );
  const columnIndex: number = cells[rowIndex].indexOf(targetCell);

  if (targetCell.textContent === "") {
    targetCell.textContent = turn;
    targetCell.style.cursor = "default";
    targetCell.removeEventListener("click", callback);
  }
  if (
    (cells[rowIndex][0].textContent === turn &&
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
      cells[0][2].textContent === turn)
  ) {
    result.textContent = `${turn} Win`;
    const button = document.createElement("button");
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
  for (let i: number = 0; i < 3; i++) {
    const row: HTMLTableRowElement = document.createElement("tr");
    rows.push(row);
    cells.push([]);
    for (let j: number = 0; j < 3; j++) {
      const cell: HTMLTableCellElement = document.createElement("td");
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
