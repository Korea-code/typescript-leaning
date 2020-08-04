"use strict";
var HORIZONTAL = 4;
var VERTICAL = 3;
var SPACE = HORIZONTAL * VERTICAL;
var Color;
(function (Color) {
    Color["RED"] = "#e74c3c";
    Color["ORANGE"] = "#f39c12";
    Color["GREEN"] = "#2ecc71";
    Color["YELLOW"] = "#f1c40f";
    Color["WHITE"] = "#ecf0f1";
    Color["PURPLE"] = "#9b59b6";
})(Color || (Color = {}));
var colors = [
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
var colorCandidate = colors.slice();
var color = [];
var clickFlag = true;
var clickedCard = [];
var completedCard = [];
var startTime;
var endTime;
function shuffle() {
    if (SPACE !== colorCandidate.length)
        throw Error("Miss matching between space's and card's number");
    for (var i = 0; i < SPACE; i++) {
        color = color.concat(colorCandidate.splice(Math.floor(Math.random() * colorCandidate.length), 1));
    }
}
function createCards(space) {
    for (var i = 0; i < space; i++) {
        var card = document.createElement("div");
        card.className = "card";
        var cardInner = document.createElement("div");
        cardInner.className = "card-inner";
        var cardFront = document.createElement("div");
        cardFront.className = "card-front";
        var cardBack = document.createElement("div");
        cardBack.className = "card-back";
        cardBack.style.backgroundColor = color[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        card.addEventListener("click", function () {
            if (!completedCard.includes(this) && !clickedCard.includes(this)) {
                this.classList.toggle("flipped");
                clickedCard.push(this);
                if (clickedCard.length === 2) {
                    var firstBackground = clickedCard[0].querySelector(".card-back").style.backgroundColor;
                    var secondBackground = clickedCard[1].querySelector(".card-back").style.backgroundColor;
                    if (firstBackground === secondBackground) {
                        completedCard.push(clickedCard[0]);
                        completedCard.push(clickedCard[1]);
                        clickedCard = [];
                        if (completedCard.length === space) {
                            endTime = new Date().getTime();
                            alert("Congrats! Your record is " + (endTime - startTime) / 1000 + " sec");
                            document.querySelector("#wrapper").innerHTML = "";
                            colorCandidate = colors.slice();
                            color = [];
                            clickedCard = [];
                            completedCard = [];
                            startTime;
                            endTime;
                            shuffle();
                            setCard(SPACE);
                        }
                    }
                    else {
                        setTimeout(function () {
                            clickedCard[0].classList.remove("flipped");
                            clickedCard[1].classList.remove("flipped");
                            clickedCard = [];
                        }, 700);
                    }
                }
            }
        });
        document.querySelector("#wrapper").appendChild(card);
    }
}
function showAllCards(space) {
    document.querySelectorAll(".card").forEach(function (card, index) {
        setTimeout(function () {
            card.classList.add("flipped");
        }, 700 + 100 * index);
    });
    setTimeout(function () {
        document.querySelectorAll(".card").forEach(function (card, index) {
            card.classList.remove("flipped");
        });
    }, 5000);
}
function setCard(space) {
    clickFlag = false;
    createCards(space);
    showAllCards(space);
    startTime = new Date().getTime();
}
shuffle();
setCard(SPACE);
