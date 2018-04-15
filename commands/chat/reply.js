const { Command } = require('discord.js-commando');

class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'reply',
      group: 'chat',
      memberName: 'reply',
      description: 'Replies with a Message.',
      examples: ['reply']
    });
  }

  run(message) {
    return message.say(`Hi ${message.author}, I am awake!`);
  }
};

module.exports = ReplyCommand;