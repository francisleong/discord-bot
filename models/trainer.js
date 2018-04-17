const mongoose = require('mongoose');

const TrainerSchema = new mongoose.Schema({
  discordId: {
    type: String,
    trim: true,
    minLength: 1,
  },
  pokedex: {
    type: [Number],
    default: []
  },
  totalCaught: {
    type: Number,
    default: 0
  }
});

TrainerSchema.statics.updatePokedex = function (discordId, pokemonId) {
  const Trainer = this;
  return Trainer.findOneAndUpdate(
    { discordId },
    {
      $inc: { totalCaught: 1 },
      $addToSet: { pokedex: pokemonId }
    });
};

const Trainer = mongoose.model('Trainer', TrainerSchema);
module.exports = { Trainer };