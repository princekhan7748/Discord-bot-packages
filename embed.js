const Discord = require('discord.js') 

function makeEmbed
(
   Title,
   Description,
   Author_Name,
   IconURL,
   URL,
   Thumbnail,
   Fields,
   Footer,
   attachment_name,
   attachments
   
) 
{
   const embed = new Discord.MessageEmbed();
   embed
      .setTitle(Title)
      .setAuthor
      (
         Author_Name,
         IconURL,
         URL
      )
      .setThumbnail(Thumbnail)
      .addFields(Fields)
      .setTimestamp(new Date())
      .setFooter(Footer)
      .setColor(0x0099ff);
   if (attachments !== ''){embed.addField(attachment_name,attachments)}
   if (Description !== ''){embed.setDescription(Description)}






   return embed;
}

module.exports = { makeEmbed };