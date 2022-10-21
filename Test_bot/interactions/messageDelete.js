const { MessageDeletion } = require('.//../channel.json');

module.exports = (client) => {
    client.on("messageDelete", async (message) => {
        try 
        {
           if (message.author.bot) return;
           const avatar = message.author.displayAvatarURL({ dynamic: true })
           const username = `${message.author.tag}`
           const usertag = `<@${message.author.id}>`
           const sentchannel = `<#${message.channelId}>`
           const channel = await client.channels.fetch(MessageDeletion);
           const urls = message.attachments.map(x => x.url).join("\n") ;

           const exampleEmbed = {
            color: 0x0099ff,
            title: 'Message Deletion: ',
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