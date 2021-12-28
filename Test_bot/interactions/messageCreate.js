const { server_log } = require('.//../channel.json');
const { makeEmbed } = require('.//../embed');

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
    
        try 
        {
           if (message.author.bot) return;
           const avatar = message.author.displayAvatarURL({ dynamic: true })
           const username = `${message.author.tag}`
           const link = message.url
           const usertag = `<@${message.author.id}>`
           const sentchannel = `<#${message.channelId}>`
           const channel = await client.channels.fetch(server_log);
           const urls = message.attachments.map(x => x.url).join("\n") ;
           await channel.send({ embeds: [ makeEmbed(
               'Message creation:',
               message.content,
               username,
               avatar,
               avatar,
               'https://cdn.discordapp.com/attachments/883834437408792607/884116353378836530/discord.jpg',
               [
               {
                   name: "Author name",
                   value: usertag,
                   inline: false
               },
               {
                   name: "Sent channel",
                   value: sentchannel,
                   inline: false
               },
               {
                name: "Message link:",
                value: link,
                inline: false
            }
                ],
               'Some Russian nonsense',
               'Attachments',
               urls
             ) ] });
        } 
        catch (error) 
        {
            console.error({error});
        }
    
      });
    }