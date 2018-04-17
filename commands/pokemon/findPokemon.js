const { Command } = require('discord.js-commando');
const { Pokemon } = require('./../../models/pokemon');

class FindPokemonCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'findpokemon',
      group: 'pokemon',
      memberName: 'findpokemon',
      description: 'Returns the name of a Pokemon given its Pokedex number',
      examples: ['!findpokemon 001', '!findpokemon 150'],
      args: [
        {
          key: 'pokemonID',
          prompt: 'Please enter the Pokemon ID.',
          type: 'string'
        }
      ]
    });
  };
  async run(msg, { pokemonID }) {
    try {
      const pokemon = await Pokemon.findPokemon(pokemonID);
      msg.reply(`a Pokedex ID of ${pokemonID} corresponds to ${pokemon.name}!`);
    } catch(e) {
      msg.reply(`Could not find any Pokemon in the Pokedex with an ID of ${pokemonID}`);
    };
  }
};

module.exports = FindPokemonCommand;