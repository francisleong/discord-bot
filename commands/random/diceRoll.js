const { Command } = require('discord.js-commando');

class DiceRollCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      group: 'random',
      memberName: 'roll',
      description: 'Rolls a six sided die a specified number of times',
      examples: ['!roll', '!roll 3'],
      args: [{
        key: 'timesToRoll',
        prompt: 'How many dice would you like to roll?',
        type: 'integer',
        default: 1,
      },
      {
        key: 'showEachRoll',
        prompt: 'Show each dice roll (true/false)',
        type: 'boolean',
        default: false
      }
    ]
    });

  };

  run(message, { timesToRoll, showEachRoll }) {
    let i = 0;
    let count = new Array(6).fill(0);
    if (timesToRoll > 10 && showEachRoll == true) {
      message.reply(`You've specified to show each roll and to roll ${timesToRoll} times. For performance sakes, we will not be showing each indivudal roll.`);
      showEachRoll = false;
    }
    
    while (i < timesToRoll) {
      i++;
      const roll = Math.floor(Math.random() * 6) + 1;
      count[roll - 1]++;

      if(showEachRoll) {
        message.reply(`rolled a six sided die and got a ${roll}`);
      }
    }
    
    let text = 'here is a summary of your rolls:\n|__Number|Times Rolled__|\n';
    for (i in count) {
      if(count[i] === 0) {
        continue;
      }
      text = text.concat(`__|      **${parseInt(i, 10) + 1}**       |            ${count[i]}          |__\n`); // i is registered as a number but treated as string so parseInt is required for some reason
    }
    message.reply(text);
  };
};

module.exports = DiceRollCommand;