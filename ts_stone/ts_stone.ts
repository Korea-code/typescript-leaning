class Card {
  private _power: number;
  private _hp: number;
  protected _field: boolean;
  private _mine: boolean;
  private _hero: boolean;
  constructor(mine: boolean, hero: boolean) {
    this._mine = mine;
    this._hero = hero;
    if (hero === true) {
      this._power = Math.ceil(Math.random() * 2);
      this._hp = Math.ceil(Math.random() * 5) + 25;
      this._field = true;
    } else {
      this._field = false;
      this._power = Math.ceil(Math.random() * 5);
      this._hp = Math.ceil(Math.random() * 5);
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
}

class Hero extends Card {
  constructor(mine: boolean) {
    super(mine, true);
  }
}
class Sub extends Card {
  private _cost: number;
  constructor(mine: boolean) {
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
function isSub(card: Card): card is Sub {
  if (!card.hero) return true;
  return false;
}
function isHero(card: Card): card is Hero {
    if (card.hero) return true;
    return false;
  }

interface Player {
  deck: HTMLDivElement;
  hero: HTMLDivElement;
  field: HTMLDivElement;
  cost: HTMLDivElement;
  deckData: Card[];
  heroData: Card | null;
  fieldData: Card[];
  chosenCard: HTMLDivElement | null;
  chosenCardData: Card[] | null;
}

const opponent: Player = {
  deck: document.getElementById("rival-deck") as HTMLDivElement,
  hero: document.getElementById("rival-hero") as HTMLDivElement,
  field: document.getElementById("rival-cards") as HTMLDivElement,
  cost: document.getElementById("rival-cost") as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};
const me: Player = {
  deck: document.getElementById("my-deck") as HTMLDivElement,
  hero: document.getElementById("my-hero") as HTMLDivElement,
  field: document.getElementById("my-cards") as HTMLDivElement,
  cost: document.getElementById("my-cost") as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};

const turnBtn = document.getElementById("turn-btn") as HTMLButtonElement;
let turn = true;

function init() {
  [opponent, me].forEach((hero) => {
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

const createDeck = ({ mine, count }: { mine: boolean; count: number }) => {
  const player = mine ? me : opponent;
  for (let i: number = 0; i < count; ++i) {
    player.deckData.push(new Sub(mine));
  }
  redrawDeck(player);
};
const createHero = ({ mine }: { mine: boolean }) => {
  const player = mine ? me : opponent;
  player.heroData = new Hero(mine);
  connectCardDOM({ data: player.heroData, DOM: player.hero, hero: true });
};
const connectCardDOM = ({
  data,
  DOM,
  hero = false,
}: {
  data: Card;
  DOM: HTMLDivElement;
  hero: boolean;
}) => {
  const cardEl = document
    .querySelector(".card-hidden .card")!
    .cloneNode(true) as HTMLDivElement;
  cardEl.querySelector(".card-att")!.textContent = data.power.toString();
  cardEl.querySelector(".card-hp")!.textContent = data.hp.toString();
  if (hero) {
    (cardEl.querySelector(".card-cost") as HTMLDivElement).style.display =
      "none";
    const name = document.createElement("div");
    name.textContent = "Hero";
    cardEl.appendChild(name);
  } else {
    cardEl.querySelector(
      ".card-cost",
    )!.textContent = (data as Sub).cost.toString();
  }
  cardEl.addEventListener("click", () => {
    if (!data.hero && data.mine && !data.field) {
      deckToField({ data: data as Sub });
    }
  });
  DOM.appendChild(cardEl);
};

const redrawScreen = ({ mine }: { mine: boolean }) => {
  const player = mine ? me : opponent;
  redrawHero(player);
};
const redrawHero = (target: Player) => {
  target.hero.innerHTML = "";
  connectCardDOM({
    data: target.heroData!,
    DOM: target.hero,
    hero: true,
  });
};
const redrawDeck = (target: Player) => {
  target.deck.innerHTML = "";
  target.deckData.forEach((data) => {
    connectCardDOM({
      data,
      DOM: target.deck,
      hero: false,
    });
  });
};

const redrawField = (target: Player) => {
  target.field.innerHTML = "";
  target.fieldData.forEach((data) => {
    connectCardDOM({
      data,
      DOM: target.field,
      hero: false,
    });
  });
};

const deckToField = ({ data }: { data: Sub }): boolean => {
  const target = turn ? me : opponent;
  const currentCost = Number(target.cost.textContent);
  if (currentCost < data.cost!) {
    alert("Cost is not enough");
    return true;
  }
  data.setField();
  const idx = target.deckData.indexOf(data);
  target.deckData.splice(idx, 1);
  target.fieldData.push(data);
  redrawDeck(target);
  redrawField(target);
  target.cost.textContent = String(currentCost - data!.cost);
  return false;
};

init();
