require('./config/config');
// require('./utility/cleanPokemonData');

const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const { mongoose } = require('./db/mongoose');

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
  client.user.setActivity('BOT TESTING!');
});

client.login(process.env.LOGIN_TOKEN);