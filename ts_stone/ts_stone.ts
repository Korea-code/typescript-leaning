class Card {
  power: number;
  hp: number;
  cost: number;
}

interface Player {
  deck: HTMLDivElement;
  hero: HTMLDivElement;
  field: HTMLDivElement;
  cost: HTMLDivElement;
  deckData: Card[];
  heroData: Card[] | null;
  fieldData: Card[];
  chosenCard: HTMLDivElement | null;
  chosenCardData: Card[] | null;
}

const opponent: Player = {
  deck: document.getElementById("rival-hero") as HTMLDivElement,
  hero: document.getElementById("rival-deck") as HTMLDivElement,
  field: document.getElementById("rival-cards") as HTMLDivElement,
  cost: document.getElementById("rival-cost") as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};
const me: Player = {
  deck: document.getElementById("my-hero") as HTMLDivElement,
  hero: document.getElementById("my-deck") as HTMLDivElement,
  field: document.getElementById("my-cards") as HTMLDivElement,
  cost: document.getElementById("my-cost") as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};