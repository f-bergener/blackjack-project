export const startGame = () => {
  return {
    type: "START_GAME",
  };
};

export const restartGame = () => {
  return {
    type: "RESTART_GAME",
  };
};

export const addToBet = (value) => {
  return {
    type: "ADD_TO_BET",
    payload: value,
  };
};

export const removeFromBet = (value) => {
  return {
    type: "REMOVE_FROM_BET",
    payload: value,
  };
};

export const hit = () => {
  return {
    type: "HIT",
  };
};

export const stay = () => {
  return {
    type: "STAY",
  };
};

export const doubleDown = () => {
  return {
    type: "DOUBLE_DOWN",
  };
};

export const split = () => {
  return {
    type: "SPLIT",
  };
};

export const splitHit = () => {
  return {
    type: "SPLIT_HIT",
  };
};

export const splitStay = () => {
  return {
    type: "SPLIT_STAY",
  };
};

export const deal = () => {
  return {
    type: "DEAL",
  };
};

export const increaseBankrollReset = () => {
  return {
    type: "INCREASE_BANKROLL_RESET",
  };
};

export const blackjackIncreaseBankrollReset = () => {
  return {
    type: "BLACKJACK_INCREASE_BANKROLL_RESET",
  };
};

export const decreaseBankrollReset = () => {
  return {
    type: "DECREASE_BANKROLL_RESET",
  };
};

export const noChangeBankrollReset = () => {
  return {
    type: "NO_CHANGE_BANKROLL_RESET",
  };
};

export const splitIncreaseBankrollReset = () => {
  return {
    type: "SPLIT_INCREASE_BANKROLL_RESET",
  };
};

export const splitDecreaseBankrollReset = () => {
  return {
    type: "SPLIT_DECREASE_BANKROLL_RESET",
  };
};

export const splitNoChangeBankrollReset = () => {
  return {
    type: "SPLIT_NO_CHANGE_BANKROLL_RESET",
  };
};
