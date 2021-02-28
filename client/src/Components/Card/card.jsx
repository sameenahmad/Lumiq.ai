import React, { useState } from "react";

import DialPad from "../../constants/dialpad";

import getHero from "../../api/getHero";

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
    const data = {
      heroCode: activeValue,
    };

    const resp = await getHero(data);

    if (resp && resp.success && resp.data) {
      sethero(resp.data);
    } else setError(resp.message || "Some Error occured");
  };

  const handleKey = (value) => {
    let temp = value;

    if (specialChars[value] === "send") {
      return handleSend();
    }

    if (specialChars[value]) {
      temp = specialChars[value];
    }

    const newValue = activeValue + temp;
    setActiveValue(newValue);
  };

  return (
    <>
      <div className="card-container">
        <h4>{hero}</h4>

        <div className="number-container">
          <div class="phone-string">
            <h2>{activeValue}</h2>
          </div>

          {Object.keys(DialPad).map((key) => {
            const currentKeyValue = DialPad[key];
            return (
              <div className="dialpad-grid-row">
                <div
                  onClick={() => handleKey(key)}
                  className="dialpad-grid-item"
                >
                  <div>{key}</div>
                  <div>{currentKeyValue}</div>
                </div>
              </div>
            );
          })}
          <p>Clear</p>
        </div>
      </div>
    </>
  );
}

export default Card;
