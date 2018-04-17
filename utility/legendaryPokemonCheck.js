// IDs of legendary pokemon
const legendaryPokemonCheck = (pokemonID) => {
  const legendaryPokemonList = [144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 251];
  if(legendaryPokemonList.includes(pokemonID)) return true;
  return false;
};

module.exports = legendaryPokemonCheck;