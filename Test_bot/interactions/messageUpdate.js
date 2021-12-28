const { server_log } = require('.//../channel.json');
const { makeEmbed } = require('.//../embed');


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
            const nurls = newMessage.attachments.map(x => x.url).join("\n")
            const channel = await client.channels.fetch(server_log);

            await channel.send(
                { embeds: [ makeEmbed(
                'Message edit: Old Message',
                oldMessage.content,
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
                     'Some Russian Nonsense',
                    'Attachements',
                    urls 
                ) ] });
            await channel.send(
                { embeds: [ makeEmbed(
                'Message edit: New Message',
                newMessage.content,
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
                     'Some Russian Nonsense',
                    'Attachements',
                    nurls 
                ) ] });
        } 
        catch (error) 
        {
            console.error({error});
        }
    
      });
}