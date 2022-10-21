const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

client.on('guildChannelTopicUpdate', (channel, oldTopic, newTopic) => {

	const LogChannel = client.channels.cache.get(server_log);
	const TopicUpdate = new MessageEmbed()
		.setTitle('Topic Updated!')
		.setColor('#2F3136')
		.setDescription(`${channel} Topic changed from **${oldTopic}** to **${newTopic}**`);

	return LogChannel.send({
		embeds: [TopicUpdate],
	});

});