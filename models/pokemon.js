const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
  ename: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    unique: true
  },
  id: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxlength: 3
  }
},
  {collection: 'pokemon'}
);

PokemonSchema.statics.findPokemon = function (pokemonID) {
  const Pokemon = this;
  return Pokemon.findOne({
    id: pokemonID
  });
}

const Pokemon = mongoose.model('Pokemon', PokemonSchema);
module.exports = {Pokemon};