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

TrainerSchema.statics.updatePokedex = async function (discordId, pokemonId) {
  const Trainer = this;
  try {
    const trainer = await Trainer.getPokedex(discordId);
    if (trainer.pokedex.includes(pokemonId)) {
      return Trainer.findOneAndUpdate(
        { discordId },
        { $inc: { totalCaught: 1 } }
      )
    } else {
      return Trainer.findOneAndUpdate(
        { discordId },
        {
          $inc: { totalCaught: 1 },
          $push: {
            pokedex: {
              $each: [pokemonId],
              $sort: 1
            }
          }
        }
      );
    }
  } catch(e) {
    console.log('Error updating the Pokedex', (e));
  };
};

TrainerSchema.statics.getPokedex = function (discordId) {
  const Trainer = this;
  return Trainer.findOne({discordId}, {pokedex: true});
}

const Trainer = mongoose.model('Trainer', TrainerSchema);
module.exports = { Trainer };