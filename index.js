console.log(process.env.NODE_ENV);
require('./config/config.js');

const { CommandoClient } = require('discord.js-commando');
const Discord = require('discord.js');
const { mongoose } = require('./db/mongoose');
const path = require('path');

const legendaryPokemonCheck = require('./utility/legendaryPokemonCheck');
const generateRandomInteger = require('./utility/generateRandomInteger');
const createRichEmbed = require('./utility/createRichEmbed');
const { Pokemon } = require('./models/pokemon');
const { Trainer } = require('./models/trainer');

let currentPokemon = undefined;
let pokemonSpawned = false;

function scramble(a) { a = a.split(""); for (var b = a.length - 1; 0 < b; b--) { var c = Math.floor(Math.random() * (b + 1)); d = a[b]; a[b] = a[c]; a[c] = d } return a.join("") };

const client = new CommandoClient({
  commandPrefix: '!',
  owner: '434122537081896961',
  disableEveryone: true
});

// Default setup for Discord Commando
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
    const randomInteger = generateRandomInteger(1, 251); // Math.random function is up to, not including, 1

    // Spawn a Pokemon randomly if one does not exist
    if(!currentPokemon) {
      const probabilityToSpawn = generateRandomInteger(1, 1);
      if (probabilityToSpawn == 1) {
        try {
          currentPokemon = await Pokemon.findPokemon(randomInteger);
          console.log(`Spawned #${randomInteger} ${currentPokemon.name}`);
          const pokemonSpawnText = legendaryPokemonCheck(randomInteger) ? 'A legendary Pokemon appeared!' : `A wild ${scramble(currentPokemon.name)} appeared!`;
          const pokemonSpawnDescription = legendaryPokemonCheck(randomInteger) ? 'Type their name to catch it!' : `Descramble the Pokemon\'s name to catch it!`;
          const embed = createRichEmbed(pokemonSpawnText, currentPokemon.image_url, pokemonSpawnDescription);

          message.channel.send({ embed });
          pokemonSpawned = true;
        } catch (e) {
          message.channel.send('Was unable to connect to the Pokemon database to retrieve the Pokemon');
          console.log('Was unable to connect to the Pokemon database to retrieve the Pokemon');
        };
      }
    }
    // Pokemon exists. Time to capture it!
    else {
      if (message.content == `${currentPokemon.name}`) {
        try {
          const trainer = await Trainer.findOne({discordId: message.author.id});
          // Creates trainer if one does not exist in the database
          if (!trainer) {
            const newTrainer = new Trainer({ discordId: message.author.id })
            await newTrainer.save();
            message.author.send('Welcome to Francis\'s Pokemon Bot! A trainer has been created with your Discord ID.');
            console.log('Created new trainer', message.author.id);
          }
          // Updates trainer database with the newly caught Pokemon
          await Trainer.updatePokedex(message.author.id, currentPokemon.id);
          console.log(`Successfully added #${currentPokemon.id} to ${message.author.id}`);
        } catch (e) {
          console.log('Was unable to connect to the Trainer database to retrieve/create trainer', e);
        }

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