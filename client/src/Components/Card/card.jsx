import React, { useState } from "react";

import { dialpad, dialpadSequence } from "../../constants/dialpad";

import getHero from "../../api/getHero";

import Clear from "../../images/clear.png";

import "./card.css";

const specialChars = {
  "#": " ",
  "*": "send",
};

function Card() {
  const [activeValue, setActiveValue] = useState("");
  const [hero, sethero] = useState(null);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    const heroCode =  activeValue && activeValue.split(" ");

    if (heroCode[0] != 0 || !heroCode[1]) {
      setError("Please enter code in the form of 0<space><code>");
      return;
    }

    const data = {
      heroCode: heroCode[1],
    };

    const resp = await getHero(data);

    if (resp && resp.success && resp.data) {
      sethero(resp.data);
    } else {
      setError(resp.message || "Some Error occured");
      sethero(null);
    }
  };

  const handleKey = (value) => {
    let temp = value;
    setError(null);

    if (specialChars[value] === "send") {
      return handleSend();
    }

    if (specialChars[value]) {
      temp = specialChars[value];
    }

    const newValue = activeValue + temp;
    setActiveValue(newValue);
  };

  const handleClear = () => {
    const str = activeValue.substring(0, activeValue.length - 1);
    setActiveValue(str);
  };

  return (
    <>
      <div className="card-container">
        <div className="section" id="hero">
          <h4>{hero && hero.toUpperCase()}</h4>
          <p className="error">{error ? error : null}</p>
        </div>

        <div className="section" id="number-panel">
          <h2>{activeValue}</h2>
          <img className="clear-img" src={Clear} onClick={handleClear} />
        </div>

        <div className="dialpad-container">
          <div className="number-row">
            {dialpadSequence.map((key) => {
              const currentKeyValue = dialpad[key];
              return (
                <div className="digit-container" onClick={() => handleKey(key)}>
                  <div className="digit">{key}</div>
                  <div className="chars">{currentKeyValue}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
