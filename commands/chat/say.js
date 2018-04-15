const { Command } = require('discord.js-commando');

class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'say',
      group: 'chat',
      memberName: 'say',
      description: 'Replies with the text you provide.',
      examples: ['!say Hi there!'],
      clientPermissions: ['MANAGE_MESSAGES'],
      guildOnly: true,
      args: [
        {
          key: 'text',
          prompt: 'What text would you like the bot to say?',
          type: 'string'
        }
      ]
    });
  }
  run(message, { text }) {
    message.delete();
    return message.say(text);
  }
};

module.exports = SayCommand;