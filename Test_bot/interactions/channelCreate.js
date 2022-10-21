
const { server_log } = require('../channel.json');


module.exports = (client) => {
    client.on("channelCreate", async (channel) => {
        try 
        {
            // channel.guild.fetchAuditLogs({type: "CHANNEL_CREATE"})
            // .then(audit => console.log(audit.entries.first()))
            // .catch(console.error)

            channel.guild.fetchAuditLogs({type: "CHANNEL_CREATE"})
            .then(audit => {

               const a = client.execute

            })
            .catch(console.error)




           const schannel = await client.channels.fetch(server_log);
           const username = channel.client.id
           const exampleEmbed = {
            color: 0x0099ff,
            title: 'Channel Creation: ',
            author: {
                name: username,
                icon_url: "https://cdn.discordapp.com/attachments/883834437408792607/884116353378836530/discord.jpg",
                url: "https://cdn.discordapp.com/attachments/883834437408792607/884116353378836530/discord.jpg",
            },
            description: channel.name,
            thumbnail: {
                url: "https://cdn.discordapp.com/attachments/883834437408792607/884116353378836530/discord.jpg",
            },
            fields: [
                {
                    name: 'User:',
                    value: "usertag",
                    inline: true,
                },
                {
                    name: 'Attachments:',
                    value: `"${urls}"`,
                    inline: true,
                },
                {
                    name: 'Sent Channel:',
                    value: "sentchannel",
                    inline: true,
                },
                
            ],
            timestamp: new Date(),
            footer: {
                text: username,
                icon_url: "avatar",
            },
        };
        
        
        schannel.send({content: `$message.id}`, embeds: [exampleEmbed] });
       
        } 
        catch (error) 
        {
            console.error({error});
        }
    
      });
    }