import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToBet } from "./actions";
import "./upChips.css";

const UpChips = () => {
  const bankroll = useSelector((state) => state.bankroll);
  const dispatch = useDispatch();

  const displayIncreaseChips = () => {
    if (bankroll >= 5000) {
      return (
        <div className="increase-chips seven">
          <div
            className="chip"
            onClick={() => dispatch(addToBet(5000))}
            style={{ borderColor: "purple" }}
          >
            $5,000
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(2500))}
            style={{ borderColor: "orange" }}
          >
            $2,500
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(1000))}
            style={{ borderColor: "red" }}
          >
            $1,000
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(500))}
            style={{ borderColor: "blue" }}
          >
            $500
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(100))}
            style={{ borderColor: "green" }}
          >
            $100
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(10))}
            style={{ borderColor: "black" }}
          >
            $10
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(1))}
            style={{ borderColor: "grey" }}
          >
            $1
          </div>
        </div>
      );
    } else if (bankroll >= 2500) {
      return (
        <div className="increase-chips six">
          <div
            className="chip"
            onClick={() => dispatch(addToBet(2500))}
            style={{ borderColor: "orange" }}
          >
            $2,500
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(1000))}
            style={{ borderColor: "red" }}
          >
            $1,000
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(500))}
            style={{ borderColor: "blue" }}
          >
            $500
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(100))}
            style={{ borderColor: "green" }}
          >
            $100
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(10))}
            style={{ borderColor: "black" }}
          >
            $10
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(1))}
            style={{ borderColor: "grey" }}
          >
            $1
          </div>
        </div>
      );
    } else if (bankroll >= 1000) {
      return (
        <div className="increase-chips five">
          <div
            className="chip"
            onClick={() => dispatch(addToBet(1000))}
            style={{ borderColor: "red" }}
          >
            $1,000
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(500))}
            style={{ borderColor: "blue" }}
          >
            $500
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(100))}
            style={{ borderColor: "green" }}
          >
            $100
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(10))}
            style={{ borderColor: "black" }}
          >
            $10
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(1))}
            style={{ borderColor: "grey" }}
          >
            $1
          </div>
        </div>
      );
    } else if (bankroll >= 500) {
      return (
        <div className="increase-chips four">
          <div
            className="chip"
            onClick={() => dispatch(addToBet(500))}
            style={{ borderColor: "blue" }}
          >
            $500
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(100))}
            style={{ borderColor: "green" }}
          >
            $100
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(10))}
            style={{ borderColor: "black" }}
          >
            $10
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(1))}
            style={{ borderColor: "grey" }}
          >
            $1
          </div>
        </div>
      );
    } else if (bankroll >= 100) {
      return (
        <div className="increase-chips three">
          <div
            className="chip"
            onClick={() => dispatch(addToBet(100))}
            style={{ borderColor: "green" }}
          >
            $100
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(10))}
            style={{ borderColor: "black" }}
          >
            $10
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(1))}
            style={{ borderColor: "grey" }}
          >
            $1
          </div>
        </div>
      );
    } else if (bankroll >= 10) {
      return (
        <div className="increase-chips two">
          <div
            className="chip"
            onClick={() => dispatch(addToBet(10))}
            style={{ borderColor: "black" }}
          >
            $10
          </div>
          <div
            className="chip"
            onClick={() => dispatch(addToBet(1))}
            style={{ borderColor: "grey" }}
          >
            $1
          </div>
        </div>
      );
    } else if (bankroll >= 1) {
      return (
        <div className="increase-chips one">
          <div
            className="chip"
            onClick={() => dispatch(addToBet(1))}
            style={{ borderColor: "grey" }}
          >
            $1
          </div>
        </div>
      );
    }
  };

  return <>{displayIncreaseChips()}</>;
};

export default UpChips;
