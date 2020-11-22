import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./splitUpdateBankroll.css";
import {
  splitIncreaseBankrollReset,
  splitDecreaseBankrollReset,
  splitNoChangeBankrollReset,
} from "./actions";

const SplitUpdateBankroll = () => {
  const splitHand = useSelector((state) => state.splitHand);
  const splitCount = useSelector((state) => state.splitCount);
  const dealerCount = useSelector((state) => state.dealerCount);
  const dispatch = useDispatch();

  const splitUpdateBankroll = () => {
    if (splitHand.length === 2) {
      if (splitCount === 21 && dealerCount !== 21) {
        return (
          <>
            <h1>You Win on the Split Hand</h1>
            <button
              className="next-hand-button"
              onClick={() => dispatch(splitIncreaseBankrollReset())}
            >
              Next
            </button>
          </>
        );
      } else if (splitCount !== 21 && dealerCount === 21) {
        return (
          <>
            <h1>Dealer Beat your Split Hand</h1>
            <button
              className="next-hand-button"
              onClick={() => dispatch(splitDecreaseBankrollReset())}
            >
              Next
            </button>
          </>
        );
      } else if (splitCount < 21 && dealerCount > 21) {
        return (
          <>
            <h1>You Win on the Split Hand</h1>
            <button
              className="next-hand-button"
              onClick={() => dispatch(splitIncreaseBankrollReset())}
            >
              Next
            </button>
          </>
        );
      } else if (splitCount <= 21 && dealerCount <= 21) {
        if (splitCount === dealerCount) {
          return (
            <>
              <h1>Push on your Split Hand</h1>
              <button
                className="next-hand-button"
                onClick={() => dispatch(splitNoChangeBankrollReset())}
              >
                Next
              </button>
            </>
          );
        } else if (splitCount > dealerCount) {
          return (
            <>
              <h1>You Win on the Split Hand</h1>
              <button
                className="next-hand-button"
                onClick={() => dispatch(splitIncreaseBankrollReset())}
              >
                Next
              </button>
            </>
          );
        } else {
          return (
            <>
              <h1>Dealer Beat your Split Hand</h1>
              <button
                className="next-hand-button"
                onClick={() => dispatch(splitDecreaseBankrollReset())}
              >
                Next
              </button>
            </>
          );
        }
      }
    } else if (splitHand.length > 2) {
      if (splitCount < 21 && dealerCount < 21) {
        if (splitCount === dealerCount) {
          return (
            <>
              <h1>Push</h1>
              <button
                className="next-hand-button"
                onClick={() => dispatch(splitNoChangeBankrollReset())}
              >
                Next
              </button>
            </>
          );
        } else if (splitCount > dealerCount) {
          return (
            <>
              <h1>You Win on the Split Hand</h1>
              <button
                className="next-hand-button"
                onClick={() => dispatch(splitIncreaseBankrollReset())}
              >
                Next
              </button>
            </>
          );
        } else if (splitCount < dealerCount) {
          return (
            <>
              <h1>Dealer Beat your Split Hand</h1>
              <button
                className="next-hand-button"
                onClick={() => dispatch(splitDecreaseBankrollReset())}
              >
                Next
              </button>
            </>
          );
        }
      } else if (splitCount > 21 && dealerCount < 21) {
        return (
          <>
            <h1>Dealer Beat your Split Hand</h1>
            <button
              className="next-hand-button"
              onClick={() => dispatch(splitDecreaseBankrollReset())}
            >
              Next
            </button>
          </>
        );
      } else if (splitCount < 21 && dealerCount > 21) {
        return (
          <>
            <h1>You Win on the Split Hand</h1>
            <button
              className="next-hand-button"
              onClick={() => dispatch(splitIncreaseBankrollReset())}
            >
              Next
            </button>
          </>
        );
      } else if (splitCount === 21 && dealerCount !== 21) {
        return (
          <>
            <h1>You Win on the Split Hand</h1>
            <button
              className="next-hand-button"
              onClick={() => dispatch(splitIncreaseBankrollReset())}
            >
              Next
            </button>
          </>
        );
      } else if (splitCount !== 21 && dealerCount === 21) {
        return (
          <>
            <h1>Dealer Beat your Split Hand</h1>
            <button
              className="next-hand-button"
              onClick={() => dispatch(splitDecreaseBankrollReset())}
            >
              Next
            </button>
          </>
        );
      } else if (splitCount === 21 && dealerCount === 21) {
        return (
          <>
            <h1>Push on your Split Hand</h1>
            <button
              className="next-hand-button"
              onClick={() => dispatch(splitDecreaseBankrollReset())}
            >
              Next
            </button>
          </>
        );
      }
    }
  };

  return <>{splitUpdateBankroll()}</>;
};

export default SplitUpdateBankroll;
