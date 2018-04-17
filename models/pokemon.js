const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    unique: true
  },
  id: {
    type: Number,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  art_url: {
    type: String,
    required: true,
    trim: true,
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