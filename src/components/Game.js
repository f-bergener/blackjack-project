import React from "react";
import { useSelector, useDispatch } from "react-redux";
import UpChips from "./UpChips";
import DownChips from "./DownChips";
import UpdateBankroll from "./UpdateBankroll";
import SplitUpdateBankroll from "./SplitUpdateBankroll";
import "./game.css";
import {
  doubleDown,
  hit,
  stay,
  split,
  splitHit,
  splitStay,
  deal,
  restartGame,
} from "./actions";

const Game = () => {
  const bankroll = useSelector((state) => state.bankroll);
  const bet = useSelector((state) => state.bet);
  const pot = useSelector((state) => state.pot);
  const splitPot = useSelector((state) => state.splitPot);
  const playerHand = useSelector((state) => state.playerHand);
  const splitHand = useSelector((state) => state.splitHand);
  const dealerHand = useSelector((state) => state.dealerHand);
  const playerCount = useSelector((state) => state.playerCount);
  const splitCount = useSelector((state) => state.splitCount);
  const dealerCount = useSelector((state) => state.dealerCount);
  const hitBoolean = useSelector((state) => state.hitBoolean);
  const stayBoolean = useSelector((state) => state.stayBoolean);
  const doubleDownBoolean = useSelector((state) => state.doubleDownBoolean);
  const splitBoolean = useSelector((state) => state.splitBoolean);
  const splitHitBoolean = useSelector((state) => state.splitHitBoolean);
  const splitStayBoolean = useSelector((state) => state.splitStayBoolean);
  const dispatch = useDispatch();

  const displayDeal = () => {
    return (
      <>
        <button className="button deal-button" onClick={() => dispatch(deal())}>
          Deal
        </button>
      </>
    );
  };

  const displayPlayerHand = (hand) => {
    return hand.map((card) => {
      return (
        <img
          className="card"
          src={require(`./data/card-images/${card.value}_of_${card.suit}.png`)}
          alt={card.concat}
        />
      );
    });
  };

  const displayDealerHand = () => {
    return dealerHand.map((card) => {
      return (
        <img
          className="card"
          src={require(`./data/card-images/${card.value}_of_${card.suit}.png`)}
          alt={card.concat}
        />
      );
    });
  };

  const displayDealerTwoCardHand = () => {
    if (dealerHand.length === 2) {
      let card = dealerHand[1];
      return (
        <>
          <img
            className="card-back"
            src={require("./data/card-images/card_back.png")}
            alt="Card Back"
            style={{ marginRight: "-1px" }}
          />
          <img
            className="card"
            src={require(`./data/card-images/${card.value}_of_${card.suit}.png`)}
            alt={card.concat}
          />
        </>
      );
    }
  };

  const displayHit = () => {
    if (playerHand.length >= 2 && playerCount < 21) {
      return (
        <button className="button hit-button" onClick={() => dispatch(hit())}>
          Hit
        </button>
      );
    } else {
      return "";
    }
  };

  const displayStay = () => {
    if (playerHand.length >= 2 && playerCount < 21) {
      return (
        <button className="button stay-button" onClick={() => dispatch(stay())}>
          Stay
        </button>
      );
    } else {
      return "";
    }
  };

  const displayDoubleDown = () => {
    if (playerHand.length === 2 && playerCount < 21) {
      return (
        <button
          className="button double-down-button"
          onClick={() => dispatch(doubleDown())}
        >
          Double Down
        </button>
      );
    } else {
      return "";
    }
  };

  const displaySplit = () => {
    if (playerHand.length === 2) {
      return (
        <button className="button split-button" onClick={() => dispatch(split())}>
          Split
        </button>
      );
    }
  };

  const displaySplitHit = () => {
    return (
      <button className="button hit-button" onClick={() => dispatch(splitHit())}>
        Hit
      </button>
    );
  };

  const displaySplitStay = () => {
    return (
      <button className="button stay-button" onClick={() => dispatch(splitStay())}>
        Stay
      </button>
    );
  };

  const gameDisplay = () => {
    const total = bankroll + pot + splitPot + bet;
    if (!total) {
      return (
        <>
          <h1>You ran out of chips</h1>
          <div className="navigation-buttons">
            <button
              className="button restart-game-button"
              onClick={() => dispatch(restartGame())}
            >
              Restart Game
            </button>
          </div>
        </>
      );
    } else {
      return (
        <div id="game">
          <h1 id="bankroll">
            Bankroll: ${bankroll.toLocaleString("en")}
          </h1>
          {bankroll > 0 && pot === 0 ? (
            <>
              <h2>Increase Bet</h2> <UpChips />
            </>
          ) : (
            ""
          )}
          {bet > 0 && pot === 0 ? (
            <>
              <h2>Lower Bet</h2> <DownChips />
            </>
          ) : (
            ""
          )}
          {pot === 0 ? (
            <h2>Bet: ${bet.toLocaleString("en")}</h2>
          ) : (
            <h2>Bet: ${pot.toLocaleString("en")}</h2>
          )}
          {splitPot ? <h2>Split Bet: ${splitPot.toLocaleString("en")}</h2> : ""}
          <div id="hand-section">
            <div className="hand-subsection">
              {playerHand.length >= 2 ? (
                <>
                  <div className="hand">{displayPlayerHand(playerHand)}</div>
                  <h1 className="count">Player Count: {playerCount}</h1>
                </>
              ) : (
                ""
              )}
              <div className="game-buttons">
                {hitBoolean && !splitStayBoolean ? displayHit() : ""}
                {stayBoolean && !splitStayBoolean ? displayStay() : ""}
                {doubleDownBoolean ? displayDoubleDown() : ""}
                {splitBoolean && splitHand.length < 2 ? displaySplit() : ""}
              </div>
            </div>
            <div className="hand-subsection">
              {splitHand.length >= 2 ? (
                <>
                  <div className="hand">{displayPlayerHand(splitHand)}</div>
                  <h1 className="count">Split Count: {splitCount}</h1>
                </>
              ) : (
                ""
              )}
              <div className="game-buttons">
                {splitHitBoolean ? displaySplitHit() : ""}
                {splitStayBoolean ? displaySplitStay() : ""}
              </div>
            </div>
            <div className="hand-subsection">
              {!stayBoolean && dealerHand.length >= 2 ? (
                <div className="hand">{displayDealerHand()}</div>
              ) : (
                <div className="hand">{displayDealerTwoCardHand()}</div>
              )}
              {!stayBoolean && dealerHand.length >= 2 ? (
                <h1 className="count">Dealer Count: {dealerCount}</h1>
              ) : (
                ""
              )}
            </div>
          </div>
          {!stayBoolean && !splitHand.length ? <UpdateBankroll /> : ""}
          {splitHand.length && !stayBoolean ? <SplitUpdateBankroll /> : ""}
          {pot === 0 && bet > 0 ? displayDeal() : ""}
          <div className="navigation-buttons">
            <button
              className="button restart-game-button"
              onClick={() => dispatch(restartGame())}
            >
              Restart Game
            </button>
          </div>
        </div>
      );
    }
  };

  return <>{gameDisplay()}</>;
};

export default Game;
