const express = require("express");
const router = express.Router();

// response handler
const sendData = require("../utils/sendResponse");
const sendError = require("../utils/sendError");

// Constants
const dialplad = require("../constants/dialpad");
const superheros = require("../constants/superheros");

router.post("/getHero", function (req, res) {
  
  const { heroCode } = req.body;

  if (!heroCode) {
    return sendError(res, 400, "Missing hero code");
  }

  if (isNaN(heroCode)) {
    return sendError(res, 400, "Missing hero code");
  }

  const hero = getHeroFromCode(0, "", heroCode);

  if (!hero) {
    return sendError(res, 404, "Incorrect hero code");
  }

  return sendData(res, 200, hero);
});

const getHeroFromCode = (strIndex, permutation, heroCode) => {
  if (strIndex > heroCode.length) {
    return null;
  }

  if (permutation.length === heroCode.length) {
    // getting superhero from code.
    if (superheros[permutation]) {
      return permutation;
    }
    return null;
  }

  const dialpadChar = dialplad[heroCode[strIndex]];

  for (let char in dialpadChar) {
    const code = getHeroFromCode(
      strIndex + 1,
      permutation + dialpadChar[char],
      heroCode
    );
    if (code) {
      return code;
    }
  }
};

module.exports = router;
