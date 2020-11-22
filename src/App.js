import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { startGame } from "./components/actions";
import Game from "./components/Game";

const App = () => {
  const homePage = useSelector((state) => state.homePage);
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const display = () => {
    if (homePage === true && game === false) {
      return (
        <>
          <h1>Welcome</h1>
          <h2>Click the button below to start your game</h2>
          <button id="start-button" onClick={() => dispatch(startGame())}>Start Game</button>
        </>
      );
    } else {
      return <Game />;
    }
  };

  return <div id="main-display-border"><div id="main-display"><div id="game-display">{display()}</div></div></div>;
};

export default App;
