// Generates a randon integer between two given integers
const generateRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

module.exports = generateRandomInteger;