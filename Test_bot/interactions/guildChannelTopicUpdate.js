module.exports = (client) => {
    client.on("guildChannelTopicUpdate", (channel, oldTopic, newTopic) => {
        try 
        {

                const LogChannel = client.channels.cache.get('719774662367772702'); // Replace with your channel id
                const TopicUpdate = new MessageEmbed()
                    .setTitle('Topic Updated!')
                    .setColor('#2F3136')
                    .setDescription(`${channel} Topic changed from **${oldTopic}** to **${newTopic}**`);
            
                return LogChannel.send({
                    embeds: [TopicUpdate]
                });
            
            
        } 
        catch (error) 
        {
            console.error({error});
        }
    
      });
    }