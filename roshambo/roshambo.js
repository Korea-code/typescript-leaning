"use strict";
var imgCoords = "0";
var rsp = {
    ROCK: "0",
    SCISSORS: "-142px",
    PAPER: "-284px",
};
var score = {
    ROCK: 0,
    SCISSORS: 1,
    PAPER: -1,
};
function computerChoice(imgCoords) {
    return Object.keys(rsp).find(function (k) { return rsp[k] === imgCoords; });
}
var interval;
var preInterval = -1;
var winCount = 0;
document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        if (interval !== preInterval) {
            preInterval = interval;
            clearInterval(interval);
            setTimeout(intervalMaker, 1500);
            var myChoice = this.textContent;
            var me = document.querySelector("#me");
            if (me)
                me.style.background = "url(http://en.pimg.jp/023/182/267/1/23182267.jpg) " + rsp[myChoice] + " 0";
            var myScore = score[myChoice];
            var computerScore = score[computerChoice(imgCoords)];
            var diff = myScore - computerScore;
            if (diff === 0) {
                console.log("tie");
            }
            else if ([-1, 3].indexOf(diff) !== -1) {
                console.log("win");
                ++winCount;
            }
            else {
                console.log("lose");
                --winCount;
            }
            document.querySelector("#winCount").textContent = "Your Score is " + winCount;
        }
    });
});
function intervalMaker() {
    interval = setInterval(function () {
        if (imgCoords === rsp.ROCK) {
            imgCoords = rsp.SCISSORS;
        }
        else if (imgCoords === rsp.SCISSORS) {
            imgCoords = rsp.PAPER;
        }
        else {
            imgCoords = rsp.ROCK;
        }
        var computer = document.querySelector("#computer");
        if (computer)
            computer.style.background = "url(http://en.pimg.jp/023/182/267/1/23182267.jpg) " + imgCoords + " 0";
    }, 100);
}
intervalMaker();
