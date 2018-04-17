const Discord = require('discord.js');

const createRichEmbed = (title, thumbnail, description) => {
  const embed = new Discord.RichEmbed()
    .setTitle(title)
    .attachFile(`./data/pokemon/img/pokeball.png`)
    .setAuthor('Pokemon Bot', 'attachment://pokeball.png')
    .setColor('#0086AE')
    .setThumbnail(thumbnail)
    .setDescription(description);
  return embed;
};

module.exports = createRichEmbed;