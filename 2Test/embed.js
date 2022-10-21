const Discord = require('discord.js') 

function makeEmbed(msg, a, b, c, d, e, f) {
   const embed = new Discord.MessageEmbed();
   embed
      .setTitle('Message event: Created')
      .setAuthor(c, b, b)
      .setDescription(msg)
      .setThumbnail('https://i.imgur.com/AfFp7pu.png')
      .addField('Message link', d)
      .addField('Author name:', e)
      .addField('Channel name:', f)
      .setTimestamp(new Date())
      .setFooter('Some Russian Nonsense')
      .setColor(0x0099ff);
      

   if (a !== '') {
      embed.addField('Attachments', a);
   }
   return embed;
}

module.exports = { makeEmbed };