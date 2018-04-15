const { Command } = require('discord.js-commando');

module.exports = class DmCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'dm',
      group: 'chat',
      memberName: 'dm',
      description: 'Sends a message to the user you mention.',
      examples: ['!dm @User Hi there!'],
      guildOnly: true,
      args: [
        {
          key: 'user',
          prompt: 'Which user do you want to send the DM to?',
          type: 'user'
        },
        {
          key: 'content',
          prompt: 'What would you like the content of the message to be?',
          type: 'string'
        }]
    });
  }
  run(msg, { user, content }) {
    msg.delete();
    return user.send(`This DM was sent from ${msg.author}\n${content}`);
  }
};