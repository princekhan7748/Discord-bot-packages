const { server_log } = require('../channel.json');
const { makeEmbed } = require('../embed');

module.exports = (client) => {
    client.on("channelCreate", async (channel) => {
        try 
        {
           const schannel = await client.channels.fetch(server_log);
           await schannel.send({ embeds: [ makeEmbed(
            'Channel creation:',
            channel.name,
            'Nothing',
            'https://cdn.discordapp.com/attachments/883834437408792607/884116353378836530/discord.jpg',
            'https://cdn.discordapp.com/attachments/883834437408792607/884116353378836530/discord.jpg',
            'https://cdn.discordapp.com/attachments/883834437408792607/884116353378836530/discord.jpg',
            [
            {
                name: "Author name",
                value: "usertag",
                inline: false
            },
            {
                name: "Sent channel",
                value: "sentchannel",
                inline: false
            },
            {
                name: "Sent channel",
                value: `${newChannel}`,
                inline: false
            }
            ],
            'Some Russian nonsense',
            'Attachments',
            'urls'
          ) ] });
        } 
        catch (error) 
        {
            console.error({error});
        }
    
      });
    }