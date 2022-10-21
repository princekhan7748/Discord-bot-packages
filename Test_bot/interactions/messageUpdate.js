const { MessageUpdates } = require('.//../channel.json');

module.exports = (client) => {
    client.on("messageUpdate", async (oldMessage, newMessage) => {
        try 
        {
            const avatar = oldMessage.author.displayAvatarURL({ dynamic: true })
            const username = `${oldMessage.author.tag}`
            const link = oldMessage.url
            const usertag = `<@${oldMessage.author.id}>`
            const sentchannel = `<#${oldMessage.channelId}>`
            const urls = oldMessage.attachments.map(x => x.url).join("\n")
            const channel = await client.channels.fetch(MessageUpdates);

            const exampleEmbed = {
                color: 0x0099ff,
                title: 'Message Creation: ',
                url: link,
                author: {
                    name: username,
                    icon_url: avatar,
                    url: avatar,
                },
                description: newMessage.content,
                thumbnail: {
                    url: avatar,
                },
                fields: [
                    {
                        name: 'User:',
                        value: usertag,
                        inline: true,
                    },
                    {
                        name: 'Attachments:',
                        value: `"${urls}"`,
                        inline: true
                    },
                    {
                        name: 'Sent Channel:',
                        value: sentchannel,
                        inline: true,
                    },
                    {
                        name: 'Message Link:',
                        value: link,
                        inline: true,
                    },
                    
                ],
                timestamp: new Date(),
                footer: {
                    text: username,
                    icon_url: avatar,
                },
            };
            channel.send({content: `${oldMessage.id}`, embeds: [exampleEmbed] });
        } 
        catch (error) 
        {
            console.error({error});
        }
    
      });
}