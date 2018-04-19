const { Command } = require('discord.js-commando');
const { mongoose } = require('./../../db/mongoose');

const { Trainer } = require('./../../models/trainer');
const { Pokemon } = require('./../../models/pokemon');
const createRichEmbed = require('./../../utility/createRichEmbed');

class PokedexInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pokedex',
      group: 'pokemon',
      memberName: 'pokedex',
      description: 'Returns or displays (option) the number of caught Pokemon and ones missing',
      examples: ['!pokedex', '!pokedex display'],
      args: [{
        key: 'list',
        prompt: 'Type list to display your Pokedex in a list format',
        type: 'string',
        default: ''
      }]
    })
  }

  async run(message, {list}) {
    const { pokedex } = await Trainer.getPokedex(message.author.id);
    if (!list) {
      try {
        const remaining = 251 - pokedex.length;
        let text = 'You\'ve got quite a way to go to become a Pokemon Master!';
        if (remaining == 0) { text = 'I can\'t believe it! You actually caught them all!' }
        else if (remaining < 20) { text = 'You\'re so close!!!' }
        else if (remaining < 126) { text = 'Nice progress! You\'re more than halfway there!' }

        message.reply(`you've caught ${pokedex.length} Pokemon! ${text}`);
      } catch (e) {
        console.log('Could not find a trainer with your ID! Please catch a Pokemon first');
      }
    } else {
      let i = 1;
      let j = 0;
      let newFieldCounter = 0;
      let text = '';
      let embed = createRichEmbed(`${message.author.username}'s Pokedex`, '', '');
      while(i < 252) {
        if(j < pokedex.length) {
          if (i < pokedex[j]) {
            text = text.concat(`${i} - ???\n`);
          } else {
            try {
              const {name} = await Pokemon.findPokemon(pokedex[j]);
              text = text.concat(`${i} - ${name}\n`);
              j++;
            } catch(e) {
              console.log('Unable to grab Pokemon ID', pokedex[j]);
            }
          }
        } else {
          text = text.concat(`${i} - ???\n`);
        }
        i++;
        newFieldCounter++;
        if(newFieldCounter == Math.ceil(251/3) || i == 252) {
          embed.addField(`${i - 84} - ${i - 1}`, `${text}`, true);
          text = '';
          newFieldCounter = 0;
        }
      }
      message.reply({ embed });
    }
  }
}

module.exports = PokedexInfoCommand;