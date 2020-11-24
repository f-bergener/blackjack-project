import cardDeck from "../data/cardDeck";

const suits = ["clubs", "diamonds", "hearts", "spades"];
const values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

function getDeck() {
  const deck = new Array();
  let y = 0;
  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      const card = {
        value: values[x],
        suit: suits[i],
        concat: values[x] + suits[i],
        id: y,
      };
      deck.push(card);
      y++;
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
}

const initialState = {
  homePage: true,
  game: false,
  currentCardDeck: getDeck(),
  bankroll: 5000,
  bet: 0,
  pot: 0,
  splitPot: 0,
  playerHand: [],
  dealerHand: [],
  splitHand: [],
  playerCount: 0,
  dealerCount: 0,
  splitCount: 0,
  activeHandBoolean: true,
  hitBoolean: false,
  stayBoolean: false,
  doubleDownBoolean: false,
  splitBoolean: false,
  splitHitBoolean: false,
  splitStayBoolean: false,
};

const calculateCount = (hand) => {
  let handArray = [];
  let aceArray = [];
  let count = 0;
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].value !== "A") {
      handArray.push(hand[i].value);
    } else {
      aceArray.push(hand[i].value);
    }
  }
  for (let i = 0; i < handArray.length; i++) {
    if (handArray[i] === "J" || handArray[i] === "Q" || handArray[i] === "K") {
      count += 10;
    } else {
      count += parseInt(handArray[i]);
    }
  }
  if (aceArray.length === 1) {
    if (count >= 11) {
      count += 1;
    } else {
      count += 11;
    }
  } else if (aceArray.length === 0) {
    count += 0;
  } else {
    if (count < 10) {
      count += aceArray.length - 1;
      if (count <= 10) {
        count += 11;
      }
    } else {
      count += aceArray.length;
    }
  }
  return count;
};

const gameReducer = (state = initialState, action) => {
  if (action.type === "START_GAME") {
    return {
      ...state,
      homePage: false,
      game: true,
    };
  } else if (action.type === "RESTART_GAME") {
    let newCardDeck = getDeck();
    return {
      ...state,
      currentCardDeck: newCardDeck,
      bankroll: 5000,
      bet: 0,
      pot: 0,
      splitPot: 0,
      playerHand: [],
      dealerHand: [],
      splitHand: [],
      playerCount: 0,
      dealerCount: 0,
      splitCount: 0,
      activeHandBoolean: true,
      hitBoolean: false,
      stayBoolean: false,
      doubleDownBoolean: false,
      splitBoolean: false,
      splitHitBoolean: false,
      splitStayBoolean: false,
    };
  } else if (action.type === "ADD_TO_BET") {
    let newBet = parseInt(state.bet) + parseInt(action.payload);
    let newBankroll = parseInt(state.bankroll) - parseInt(action.payload);
    return {
      ...state,
      bet: newBet,
      bankroll: newBankroll,
    };
  } else if (action.type === "REMOVE_FROM_BET") {
    let newBet = parseInt(state.bet) - parseInt(action.payload);
    let newBankroll = parseInt(state.bankroll) + parseInt(action.payload);
    if (newBet < 0) {
      newBankroll = -newBet + newBankroll;
      newBet = 0;
    }
    return {
      ...state,
      bet: newBet,
      bankroll: newBankroll,
    };
  } else if (action.type === "DEAL") {
    state.playerHand = [];
    state.dealerHand = [];
    state.splitHand = [];
    let firstPlayerCard = state.currentCardDeck.pop();
    state.playerHand.push(firstPlayerCard);
    let firstDealerCard = state.currentCardDeck.pop();
    state.dealerHand.push(firstDealerCard);
    let secondPlayerCard = state.currentCardDeck.pop();
    state.playerHand.push(secondPlayerCard);
    let secondDealerCard = state.currentCardDeck.pop();
    state.dealerHand.push(secondDealerCard);
    state.playerCount = calculateCount(state.playerHand);
    state.dealerCount = calculateCount(state.dealerHand);
    let newBet = 0;
    let newPot = state.bet;
    if (state.playerCount === 21 && state.dealerCount < 17) {
      while (state.dealerCount < 17) {
        let cardToAdd = state.currentCardDeck.pop();
        state.dealerHand.push(cardToAdd);
        state.dealerCount = calculateCount(state.dealerHand);
      }
      return {
        ...state,
        bet: newBet,
        pot: newPot,
        playerHand: state.playerHand,
        dealerHand: state.dealerHand,
        currentCardDeck: state.currentCardDeck,
        playerCount: state.playerCount,
        dealerCount: state.dealerCount,
        hitBoolean: false,
        stayBoolean: false,
        doubleDownBoolean: false,
        splitBoolean: false,
        splitHitBoolean: false,
        splitStayBoolean: false,
      };
    } else if (
      state.playerCount === 21 &&
      state.dealerCount >= 17 &&
      state.dealerCount <= 21
    ) {
      return {
        ...state,
        bet: newBet,
        pot: newPot,
        playerHand: state.playerHand,
        dealerHand: state.dealerHand,
        currentCardDeck: state.currentCardDeck,
        playerCount: state.playerCount,
        dealerCount: state.dealerCount,
        hitBoolean: false,
        stayBoolean: false,
        doubleDownBoolean: false,
        splitBoolean: false,
        splitHitBoolean: false,
        splitStayBoolean: false,
      };
    } else if (
      state.playerHand[0].value === state.playerHand[1].value &&
      state.bankroll >= newPot
    ) {
      return {
        ...state,
        bet: newBet,
        pot: newPot,
        playerHand: state.playerHand,
        dealerHand: state.dealerHand,
        currentCardDeck: state.currentCardDeck,
        playerCount: state.playerCount,
        dealerCount: state.dealerCount,
        hitBoolean: true,
        stayBoolean: true,
        doubleDownBoolean: true,
        splitBoolean: true,
      };
    } else if (state.playerCount < 21 && state.bankroll >= newPot) {
      return {
        ...state,
        bet: newBet,
        pot: newPot,
        playerHand: state.playerHand,
        dealerHand: state.dealerHand,
        currentCardDeck: state.currentCardDeck,
        playerCount: state.playerCount,
        dealerCount: state.dealerCount,
        hitBoolean: true,
        stayBoolean: true,
        doubleDownBoolean: true,
      };
    }
    return {
      ...state,
      bet: newBet,
      pot: newPot,
      playerHand: state.playerHand,
      dealerHand: state.dealerHand,
      currentCardDeck: state.currentCardDeck,
      playerCount: state.playerCount,
      dealerCount: state.dealerCount,
      hitBoolean: true,
      stayBoolean: true,
      doubleDownBoolean: false,
    };
  } else if (action.type === "STAY") {
    let cardToAdd;
    while (state.dealerCount < 17) {
      cardToAdd = state.currentCardDeck.pop();
      state.dealerHand.push(cardToAdd);
      state.dealerCount = calculateCount(state.dealerHand);
    }
    let newDealerCount = calculateCount(state.dealerHand);
    return {
      ...state,
      dealerHand: state.dealerHand,
      currentCardDeck: state.currentCardDeck,
      dealerCount: newDealerCount,
      hitBoolean: false,
      stayBoolean: false,
      doubleDownBoolean: false,
      splitBoolean: false,
    };
  } else if (action.type === "HIT") {
    let cardToAdd = state.currentCardDeck.pop();
    state.playerHand.push(cardToAdd);
    let newPlayerCount = calculateCount(state.playerHand);
    if (newPlayerCount === 21) {
      while (state.dealerCount < 17) {
        cardToAdd = state.currentCardDeck.pop();
        state.dealerHand.push(cardToAdd);
        state.dealerCount = calculateCount(state.dealerHand);
      }
      let newDealerCount = calculateCount(state.dealerHand);
      return {
        ...state,
        playerHand: state.playerHand,
        currentCardDeck: state.currentCardDeck,
        playerCount: newPlayerCount,
        dealerHand: state.dealerHand,
        dealerCount: newDealerCount,
        hitBoolean: false,
        stayBoolean: false,
        doubleDownBoolean: false,
      };
    } else if (newPlayerCount < 21) {
      return {
        ...state,
        playerHand: state.playerHand,
        currentCardDeck: state.currentCardDeck,
        playerCount: newPlayerCount,
        hitBoolean: true,
        stayBoolean: true,
        doubleDownBoolean: false,
      };
    } else if (newPlayerCount > 21) {
      return {
        ...state,
        playerHand: state.playerHand,
        currentCardDeck: state.currentCardDeck,
        playerCount: newPlayerCount,
        hitBoolean: false,
        stayBoolean: false,
        doubleDownBoolean: false,
      };
    }
  } else if (action.type === "DOUBLE_DOWN") {
    let cardToAdd = state.currentCardDeck.pop();
    state.playerHand.push(cardToAdd);
    let newPlayerCount = calculateCount(state.playerHand);
    let newPot = state.pot * 2;
    let newBankroll = state.bankroll - state.pot;
    if (newPlayerCount <= 21) {
      while (state.dealerCount < 17) {
        cardToAdd = state.currentCardDeck.pop();
        state.dealerHand.push(cardToAdd);
        state.dealerCount = calculateCount(state.dealerHand);
      }
      let newDealerCount = calculateCount(state.dealerHand);
      return {
        ...state,
        pot: newPot,
        bankroll: newBankroll,
        playerHand: state.playerHand,
        currentCardDeck: state.currentCardDeck,
        playerCount: newPlayerCount,
        dealerHand: state.dealerHand,
        dealerCount: newDealerCount,
        hitBoolean: false,
        stayBoolean: false,
        doubleDownBoolean: false,
      };
    }
    return {
      ...state,
      pot: newPot,
      bankroll: newBankroll,
      playerHand: state.playerHand,
      currentCardDeck: state.currentCardDeck,
      playerCount: newPlayerCount,
      hitBoolean: false,
      stayBoolean: false,
      doubleDownBoolean: false,
    };
  } else if (action.type === "SPLIT") {
    let cardToAdd = state.playerHand[1];
    state.splitHand.push(cardToAdd);
    state.playerHand.pop();
    let secondPlayerCard = state.currentCardDeck.pop();
    state.playerHand.push(secondPlayerCard);
    let secondSplitCard = state.currentCardDeck.pop();
    state.splitHand.push(secondSplitCard);
    state.bankroll = state.bankroll - state.pot;
    state.splitPot = state.pot;
    state.splitCount = calculateCount(state.splitHand);
    state.playerCount = calculateCount(state.playerHand);
    return {
      ...state,
      splitHand: state.splitHand,
      playerHand: state.playerHand,
      bankroll: state.bankroll,
      splitPot: state.splitPot,
      splitCount: state.splitCount,
      doubleDownBoolean: false,
      splitBoolean: false,
      splitHitBoolean: true,
      splitStayBoolean: true,
    };
  } else if (action.type === "SPLIT_HIT") {
    let cardToAdd = state.currentCardDeck.pop();
    state.splitHand.push(cardToAdd);
    let newSplitCount = calculateCount(state.splitHand);
    if (newSplitCount === 21) {
      return {
        ...state,
        splitHand: state.splitHand,
        currentCardDeck: state.currentCardDeck,
        splitCount: newSplitCount,
        splitBoolean: false,
        splitHitBoolean: false,
        splitStayBoolean: false,
      };
    } else if (newSplitCount < 21) {
      return {
        ...state,
        splitHand: state.splitHand,
        currentCardDeck: state.currentCardDeck,
        splitCount: newSplitCount,
        splitBoolean: false,
        splitHitBoolean: true,
        splitStayBoolean: true,
      };
    } else if (newSplitCount > 21) {
      return {
        ...state,
        splitHand: state.splitHand,
        currentCardDeck: state.currentCardDeck,
        splitCount: newSplitCount,
        splitBoolean: false,
        splitHitBoolean: false,
        splitStayBoolean: false,
      };
    }
  } else if (action.type === "SPLIT_STAY") {
    return {
      ...state,
      currentCardDeck: state.currentCardDeck,
      splitBoolean: false,
      splitHitBoolean: false,
      splitStayBoolean: false,
      doubleDownBoolean: false,
    };
  } else if (action.type === "SWITCH_HAND") {
  } else if (action.type === "INCREASE_BANKROLL_RESET") {
    state.bankroll = state.bankroll + state.pot * 2;
    state.playerHand = [];
    state.dealerHand = [];
    state.playerCount = 0;
    state.dealerCount = 0;
    state.pot = 0;
    if (state.currentCardDeck.length < 20) {
      let newCardDeck = getDeck();
      return {
        ...state,
        bankroll: state.bankroll,
        pot: state.pot,
        playerHand: state.playerHand,
        dealerHand: state.dealerHand,
        playerCount: state.playerCount,
        dealerCount: state.dealerCount,
        currentCardDeck: newCardDeck,
      };
    }
    return {
      ...state,
      bankroll: state.bankroll,
      pot: state.pot,
      playerHand: state.playerHand,
      dealerHand: state.dealerHand,
      playerCount: state.playerCount,
      dealerCount: state.dealerCount,
    };
  } else if (action.type === "BLACKJACK_INCREASE_BANKROLL_RESET") {
    state.bankroll = state.bankroll + state.pot * 2 + state.pot * 0.5;
    state.playerHand = [];
    state.dealerHand = [];
    state.playerCount = 0;
    state.dealerCount = 0;
    state.pot = 0;
    if (state.currentCardDeck.length < 20) {
      let newCardDeck = getDeck();
      return {
        ...state,
        bankroll: state.bankroll,
        pot: state.pot,
        playerHand: state.playerHand,
        dealerHand: state.dealerHand,
        playerCount: state.playerCount,
        dealerCount: state.dealerCount,
        currentCardDeck: newCardDeck,
      };
    }
    return {
      ...state,
      bankroll: state.bankroll,
      pot: state.pot,
      playerHand: state.playerHand,
      dealerHand: state.dealerHand,
      playerCount: state.playerCount,
      dealerCount: state.dealerCount,
    };
  } else if (action.type === "DECREASE_BANKROLL_RESET") {
    state.playerHand = [];
    state.dealerHand = [];
    state.playerCount = 0;
    state.dealerCount = 0;
    state.pot = 0;
    if (state.currentCardDeck.length < 20) {
      let newCardDeck = getDeck();
      return {
        ...state,
        bankroll: state.bankroll,
        pot: state.pot,
        playerHand: state.playerHand,
        dealerHand: state.dealerHand,
        playerCount: state.playerCount,
        dealerCount: state.dealerCount,
        currentCardDeck: newCardDeck,
      };
    }
    return {
      ...state,
      pot: state.pot,
      playerHand: state.playerHand,
      dealerHand: state.dealerHand,
      playerCount: state.playerCount,
      dealerCount: state.dealerCount,
    };
  } else if (action.type === "NO_CHANGE_BANKROLL_RESET") {
    state.bankroll = state.bankroll + state.pot;
    state.playerHand = [];
    state.dealerHand = [];
    state.playerCount = 0;
    state.dealerCount = 0;
    state.pot = 0;
    if (state.currentCardDeck.length < 20) {
      let newCardDeck = getDeck();
      return {
        ...state,
        bankroll: state.bankroll,
        pot: state.pot,
        playerHand: state.playerHand,
        dealerHand: state.dealerHand,
        playerCount: state.playerCount,
        dealerCount: state.dealerCount,
        currentCardDeck: newCardDeck,
      };
    }
    return {
      ...state,
      bankroll: state.bankroll,
      pot: state.pot,
      playerHand: state.playerHand,
      dealerHand: state.dealerHand,
      playerCount: state.playerCount,
      dealerCount: state.dealerCount,
    };
  } else if (action.type === "SPLIT_INCREASE_BANKROLL_RESET") {
    state.bankroll = state.bankroll + state.splitPot * 2;
    state.splitHand = [];
    state.splitCount = 0;
    state.splitPot = 0;
    return {
      ...state,
      bankroll: state.bankroll,
      splitPot: state.splitPot,
      splitHand: state.splitHand,
      splitCount: state.splitCount,
    };
  } else if (action.type === "SPLIT_DECREASE_BANKROLL_RESET") {
    state.splitHand = [];
    state.splitCount = 0;
    state.splitPot = 0;
    return {
      ...state,
      splitPot: state.splitPot,
      splitHand: state.splitHand,
      splitCount: state.splitCount,
    };
  } else if (action.type === "SPLIT_NO_CHANGE_BANKROLL_RESET") {
    state.bankroll = state.bankroll + state.splitPot;
    state.splitHand = [];
    state.splitCount = 0;
    state.splitPot = 0;
    return {
      ...state,
      bankroll: state.bankroll,
      splitPot: state.splitPot,
      splitHand: state.splitHand,
      splitCount: state.splitCount,
    };
  } else {
    return state;
  }
};

export default gameReducer;
