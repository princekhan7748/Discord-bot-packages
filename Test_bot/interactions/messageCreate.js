const { MessageCreation } = require('.//../channel.json');

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
    
        try 
        {
           if (message.author.bot) return;
           const avatar = message.author.displayAvatarURL({ dynamic: true })
           const username = `${message.author.tag}`
           const usertag = `<@${message.author.id}>`
           const link = message.url
           const sentchannel = `<#${message.channelId}>`
           const channel = await client.channels.fetch(MessageCreation);
           const urls = message.attachments.map(x => x.url).join("\n") ;
           const reply = `https://discord.com/channels/${message.reference?.guildId}/${message.reference?.channelId}/${message.reference?.messageId}`
           const repliedtag = message.reference?.messageId

           const exampleEmbed = {
            color: 0x0099ff,
            title: 'Message Creation: ',
            url: link,
            author: {
                name: username,
                icon_url: avatar,
                url: avatar,
            },
            description: message.content,
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
                    inline: true,
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
                {
                    name: 'Reply to:',
                    value: reply,
                    inline: true,
                },
                {
                    name: 'replied message tag',
                    value: `"${repliedtag}"`,
                    inline: true,
                },
                
            ],
            timestamp: new Date(),
            footer: {
                text: username,
                icon_url: avatar,
            },
        };
        
        
        channel.send({content: `${message.id}`, embeds: [exampleEmbed] });
        } 
        catch (error) 
        {
            console.error({error});
        }
    
      });
    }