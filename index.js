require('./config/config');

const { CommandoClient } = require('discord.js-commando');
const Discord = require('discord.js');
const { mongoose } = require('./db/mongoose');
const path = require('path');

const legendaryPokemonCheck = require('./utility/legendaryPokemonCheck');
const generateRandomInteger = require('./utility/generateRandomInteger');
const createRichEmbed = require('./utility/createRichEmbed');
const { Pokemon } = require('./models/pokemon');

let currentPokemon = undefined;
let pokemonSpawned = false;

function scramble(a) { a = a.split(""); for (var b = a.length - 1; 0 < b; b--) { var c = Math.floor(Math.random() * (b + 1)); d = a[b]; a[b] = a[c]; a[c] = d } return a.join("") };

const client = new CommandoClient({
  commandPrefix: '!',
  owner: '434122537081896961',
  disableEveryone: true
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['chat', 'Basic chat commands'],
    ['random', 'Random generator commands'],
    ['pokemon', 'Pokemon related commands']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
  console.log(`${client.user.username} is up and running!`);
  client.user.setActivity('POKEMON BOT TESTING!');
});

client.on('message', async (message) => {
  if (!message.author.bot) {
    const randomInteger = generateRandomInteger(1, 251);
    
    if(!currentPokemon) {
      const probabilityToSpawn = generateRandomInteger(1, 20);
      if (probabilityToSpawn == 1) {
        try {
          currentPokemon = await Pokemon.findPokemon(randomInteger);
          const pokemonSpawnText = legendaryPokemonCheck(randomInteger) ? 'A legendary Pokemon appeared!' : `A wild ${scramble(currentPokemon.name)} appeared!`;
          const pokemonSpawnDescription = legendaryPokemonCheck(randomInteger) ? 'Type their name to catch it!' : `Descramble the Pokemon\'s name to catch it!`;
          const embed = createRichEmbed(pokemonSpawnText, currentPokemon.image_url, pokemonSpawnDescription);
          message.channel.send({ embed });
          pokemonSpawned = true;
        } catch (e) {
          message.channel.send('Was unable to connect to the Pokemon database to retrieve the Pokemon');
        };
      }
    } else {
      if(message.content == `${currentPokemon.name}`) {
        message.channel.send(`Added ${currentPokemon.name} to ${message.author}'s Pokedex!`);
        const embed = createRichEmbed(`You caught #${currentPokemon.id} ${currentPokemon.name}!`, currentPokemon.image_url, currentPokemon.description);
        message.author.send({ embed });
        currentPokemon = undefined;
      } else {
      
      }
    }
  }
})

client.login(process.env.LOGIN_TOKEN);