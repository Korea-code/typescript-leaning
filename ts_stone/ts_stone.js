"use strict";
class Card {
    constructor(mine, hero) {
        this._mine = mine;
        this._hero = hero;
        if (hero === true) {
            this._power = Math.ceil(Math.random() * 2);
            this._hp = Math.ceil(Math.random() * 5) + 25;
            this._field = true;
            this._attackable = true;
        }
        else {
            this._field = false;
            this._power = Math.ceil(Math.random() * 5);
            this._hp = Math.ceil(Math.random() * 5);
            this._attackable = false;
        }
    }
    get power() {
        return this._power;
    }
    get hp() {
        return this._hp;
    }
    get mine() {
        return this._mine;
    }
    get hero() {
        return this._hero;
    }
    get field() {
        return this._field;
    }
    get attackable() {
        return this._attackable;
    }
    attacted(power) {
        this._hp -= power;
    }
    attack(target) {
        if (this._attackable) {
            this.attacted(target.power);
            target.attacted(this.power);
            this._attackable = false;
        }
    }
    allowAttack() {
        this._attackable = true;
    }
}
class Hero extends Card {
    constructor(mine) {
        super(mine, true);
        this._cost = {
            currentCost: 1,
            totalCost: 1,
        };
    }
    addOneCost() {
        if (this._cost.totalCost < 10)
            this._cost.currentCost = ++this._cost.totalCost;
    }
    get cost() {
        return this._cost;
    }
    useCost(usedCost) {
        this._cost.currentCost -= usedCost;
    }
}
class Sub extends Card {
    constructor(mine) {
        super(mine, false);
        this._cost = Math.floor((this.power + this.hp) / 2);
    }
    get cost() {
        return this._cost;
    }
    setField() {
        this._field = !this._field;
    }
}
function isSub(card) {
    return !card.hero;
}
function isHero(card) {
    return card.hero;
}
const opponent = {
    deck: document.getElementById("rival-deck"),
    hero: document.getElementById("rival-hero"),
    field: document.getElementById("rival-cards"),
    total_cost: document.getElementById("rival-total-cost"),
    current_cost: document.getElementById("rival-current-cost"),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null,
};
const me = {
    deck: document.getElementById("my-deck"),
    hero: document.getElementById("my-hero"),
    field: document.getElementById("my-cards"),
    total_cost: document.getElementById("my-total-cost"),
    current_cost: document.getElementById("my-current-cost"),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null,
};
const starter = Math.floor(Math.random() * 2) === 0 ? true : false;
let turn = starter;
const selectedCard = {
    isSelected: false,
    cardElement: null,
    cardData: null,
};
function initSelectedCard() {
    selectedCard.isSelected = false;
    if (selectedCard.cardElement)
        selectedCard.cardElement.classList.remove("card-selected");
    selectedCard.cardElement = null;
    selectedCard.cardData = null;
}
function selectCard({ div, data }) {
    selectedCard.isSelected = true;
    selectedCard.cardElement = div;
    selectedCard.cardData = data;
    div.classList.add("card-selected");
}
function init() {
    [opponent, me].forEach((hero) => {
        hero.deckData = [];
        hero.heroData = null;
        hero.fieldData = [];
        hero.chosenCard = null;
        hero.chosenCardData = null;
        createDeck({ player: hero, count: 4 });
    });
    createHero({ mine: true });
    createHero({ mine: false });
    redrawScreen({ mine: true });
    redrawScreen({ mine: false });
}
const createDeck = ({ player, count }) => {
    for (let i = 0; i < count; ++i) {
        player.deckData.push(new Sub(player === me ? true : false));
    }
    redrawDeck(player);
};
const createHero = ({ mine }) => {
    const player = mine ? me : opponent;
    player.heroData = new Hero(mine);
    connectCardDOM({ data: player.heroData, DOM: player.hero, hero: true });
};
const connectCardDOM = ({ data, DOM, hero = false, }) => {
    const cardEl = document
        .querySelector(".card-hidden .card")
        .cloneNode(true);
    cardEl.querySelector(".card-power").textContent = data.power.toString();
    cardEl.querySelector(".card-hp").textContent = data.hp.toString();
    if (hero) {
        cardEl.querySelector(".card-cost").style.display =
            "none";
        const name = document.createElement("div");
        name.textContent = "Hero";
        cardEl.appendChild(name);
    }
    else if (isSub(data)) {
        cardEl.querySelector(".card-cost").textContent = data.cost.toString();
    }
    cardEl.addEventListener("click", () => {
        if (isSub(data) && data.mine === turn && !data.field) {
            deckToField({ data });
        }
        else if (data.mine === turn && data.attackable && data.field) {
            if (selectedCard.isSelected && selectedCard.cardElement === cardEl) {
                initSelectedCard();
            }
            else if (selectedCard.isSelected) {
                initSelectedCard();
                selectCard({ div: cardEl, data });
            }
            else {
                selectCard({ div: cardEl, data });
            }
        }
        else if (data.mine === !turn && data.field && selectedCard.isSelected) {
            selectedCard.cardData.attack(data);
            checkField({ player: me });
            checkField({ player: opponent });
            redrawField(me);
            redrawField(opponent);
            redrawHero(me);
            redrawHero(opponent);
        }
    });
    DOM.appendChild(cardEl);
};
const checkField = ({ player }) => {
    for (let i = 0; i < player.fieldData.length; ++i) {
        if (player.fieldData[i].hp <= 0) {
            player.fieldData.splice(i, 1);
        }
    }
};
const redrawScreen = ({ mine }) => {
    const player = mine ? me : opponent;
    redrawHero(player);
    drawTurn(turn);
};
function drawTurn(turn) {
    if (turn) {
        document.querySelector("#rival").classList.remove("turn");
        document.querySelector("#my").classList.add("turn");
    }
    else {
        document.querySelector("#my").classList.remove("turn");
        document.querySelector("#rival").classList.add("turn");
    }
}
const redrawHero = (target) => {
    target.hero.innerHTML = "";
    connectCardDOM({
        data: target.heroData,
        DOM: target.hero,
        hero: true,
    });
};
const redrawDeck = (target) => {
    target.deck.innerHTML = "";
    target.deckData.forEach((data) => {
        connectCardDOM({
            data,
            DOM: target.deck,
            hero: false,
        });
    });
};
const redrawField = (target) => {
    target.field.innerHTML = "";
    initSelectedCard();
    target.fieldData.forEach((data) => {
        connectCardDOM({
            data,
            DOM: target.field,
            hero: false,
        });
    });
};
const deckToField = ({ data }) => {
    const target = turn ? me : opponent;
    const currentCost = target.heroData.cost.currentCost;
    if (currentCost < data.cost) {
        alert("Cost is not enough");
        return true;
    }
    data.setField();
    const idx = target.deckData.indexOf(data);
    target.deckData.splice(idx, 1);
    target.fieldData.push(data);
    redrawDeck(target);
    redrawField(target);
    target.current_cost.textContent = String(currentCost - data.cost);
    target.heroData.useCost(data.cost);
    return false;
};
const redrawCost = ({ mine }) => {
    const target = mine ? me : opponent;
    target.total_cost.textContent = target.heroData.cost.totalCost.toString();
    target.current_cost.textContent = target.heroData.cost.totalCost.toString();
};
const turnBtn = document.getElementById("turn-btn");
function nextTurn() {
    turn = !turn;
    drawTurn(turn);
    if (turn === starter) {
        [me, opponent].forEach((player) => {
            player.heroData.addOneCost();
        });
    }
    redrawScreen({ mine: true });
    redrawScreen({ mine: false });
    redrawCost({ mine: turn });
    newTurn();
}
function newTurn() {
    const target = turn ? me : opponent;
    drawCard(target);
    target.fieldData.forEach((card) => {
        card.allowAttack();
    });
    target.heroData.allowAttack();
    initSelectedCard();
}
function drawCard(player) {
    createDeck({ player, count: 1 });
    if (player.deckData.length > 10) {
        setTimeout(() => {
            alert("Too many cards.");
            player.deckData.pop();
            redrawDeck(player);
        }, 200);
    }
    else {
        redrawDeck(player);
    }
}
turnBtn.addEventListener("click", nextTurn);
init();
