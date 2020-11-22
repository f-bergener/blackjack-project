//Using getDeck function from .THATSOFTWAREDUDE Coding A Card Deck in JavaScript article

const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = [
  "A",
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  "J",
  "Q",
  "K",
];

const getDeck = () => {
  const deck = new Array();
  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      const card = {
        value: values[x],
        suit: suits[i],
        id: (i + 1) * (x + 1),
      };
      deck.push(card);
    }
  }
  for (let i = 0; i < 2000; i++) {
    let location1 = Math.floor(Math.random() * deck.length);
    console.log(location1);
    let location2 = Math.floor(Math.random() * deck.length);
    let tmp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
  return deck;
};

const cardDeck = getDeck();

export default cardDeck;