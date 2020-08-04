"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Card = /** @class */ (function () {
    function Card(mine, hero) {
        this._mine = mine;
        this._hero = hero;
        if (hero === true) {
            this._power = Math.ceil(Math.random() * 2);
            this._hp = Math.ceil(Math.random() * 5) + 25;
            this._field = true;
        }
        else {
            this._field = false;
            this._power = Math.ceil(Math.random() * 5);
            this._hp = Math.ceil(Math.random() * 5);
        }
    }
    Object.defineProperty(Card.prototype, "power", {
        get: function () {
            return this._power;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "hp", {
        get: function () {
            return this._hp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "mine", {
        get: function () {
            return this._mine;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "hero", {
        get: function () {
            return this._hero;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "field", {
        get: function () {
            return this._field;
        },
        enumerable: false,
        configurable: true
    });
    return Card;
}());
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero(mine) {
        return _super.call(this, mine, true) || this;
    }
    return Hero;
}(Card));
var Sub = /** @class */ (function (_super) {
    __extends(Sub, _super);
    function Sub(mine) {
        var _this = _super.call(this, mine, false) || this;
        _this._cost = Math.floor((_this.power + _this.hp) / 2);
        return _this;
    }
    Object.defineProperty(Sub.prototype, "cost", {
        get: function () {
            return this._cost;
        },
        enumerable: false,
        configurable: true
    });
    Sub.prototype.setField = function () {
        this._field = !this._field;
    };
    return Sub;
}(Card));
function isSub(card) {
    if (card.cost)
        return true;
    return false;
}
var opponent = {
    deck: document.getElementById("rival-deck"),
    hero: document.getElementById("rival-hero"),
    field: document.getElementById("rival-cards"),
    cost: document.getElementById("rival-cost"),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null,
};
var me = {
    deck: document.getElementById("my-deck"),
    hero: document.getElementById("my-hero"),
    field: document.getElementById("my-cards"),
    cost: document.getElementById("my-cost"),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null,
};
var turnBtn = document.getElementById("turn-btn");
var turn = true;
function init() {
    [opponent, me].forEach(function (hero) {
        hero.deckData = [];
        hero.heroData = null;
        hero.fieldData = [];
        hero.chosenCard = null;
        hero.chosenCardData = null;
    });
    createHero({ mine: true });
    createHero({ mine: false });
    createDeck({ mine: true, count: 5 });
    createDeck({ mine: false, count: 5 });
    redrawScreen({ mine: true });
    redrawScreen({ mine: false });
}
var createDeck = function (_a) {
    var mine = _a.mine, count = _a.count;
    var player = mine ? me : opponent;
    for (var i = 0; i < count; ++i) {
        player.deckData.push(new Sub(mine));
    }
    redrawDeck(player);
};
var createHero = function (_a) {
    var mine = _a.mine;
    var player = mine ? me : opponent;
    player.heroData = new Hero(mine);
    connectCardDOM({ data: player.heroData, DOM: player.hero, hero: true });
};
var connectCardDOM = function (_a) {
    var data = _a.data, DOM = _a.DOM, _b = _a.hero, hero = _b === void 0 ? false : _b;
    var cardEl = document
        .querySelector(".card-hidden .card")
        .cloneNode(true);
    cardEl.querySelector(".card-att").textContent = data.power.toString();
    cardEl.querySelector(".card-hp").textContent = data.hp.toString();
    if (hero) {
        cardEl.querySelector(".card-cost").style.display =
            "none";
        var name_1 = document.createElement("div");
        name_1.textContent = "Hero";
        cardEl.appendChild(name_1);
    }
    else {
        cardEl.querySelector(".card-cost").textContent = data.cost.toString();
    }
    cardEl.addEventListener("click", function () {
        if (!data.hero && data.mine && !data.field) {
            deckToField({ data: data });
        }
    });
    DOM.appendChild(cardEl);
};
var redrawScreen = function (_a) {
    var mine = _a.mine;
    var player = mine ? me : opponent;
    redrawHero(player);
};
var redrawHero = function (target) {
    target.hero.innerHTML = "";
    connectCardDOM({
        data: target.heroData,
        DOM: target.hero,
        hero: true,
    });
};
var redrawDeck = function (target) {
    target.deck.innerHTML = "";
    target.deckData.forEach(function (data) {
        connectCardDOM({
            data: data,
            DOM: target.deck,
            hero: false,
        });
    });
};
var redrawField = function (target) {
    target.field.innerHTML = "";
    target.fieldData.forEach(function (data) {
        connectCardDOM({
            data: data,
            DOM: target.field,
            hero: false,
        });
    });
};
var deckToField = function (_a) {
    var data = _a.data;
    var target = turn ? me : opponent;
    var currentCost = Number(target.cost.textContent);
    if (currentCost < data.cost) {
        alert("Cost is not enough");
        return true;
    }
    data.setField();
    var idx = target.deckData.indexOf(data);
    target.deckData.splice(idx, 1);
    target.fieldData.push(data);
    redrawDeck(target);
    redrawField(target);
    target.cost.textContent = String(currentCost - data.cost);
    return false;
};
init();
