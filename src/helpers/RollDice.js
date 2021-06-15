module.exports = rollDice = (args) => {
  const normalDiceRoll = Math.floor(Math.random() * 6 + 1);
  return args[0] === undefined
    ? normalDiceRoll
    : Math.floor(Math.random() * args[0]);
};
