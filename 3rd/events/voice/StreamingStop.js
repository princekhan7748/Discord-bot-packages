const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// User Stopped to Stream
client.on('voiceStreamingStop', (member, voiceChannel) => {

	const LogChannel = client.channels.cache.get(server_log);
	const UserStoppedStreaming = new MessageEmbed()
		.setTitle('User Stopped to Stream')
		.setColor('#2F3136')
		.setDescription(member.user.tag + ' stopped streaming in ' + voiceChannel.name);

	return LogChannel.send({
		embeds: [UserStoppedStreaming],
	});

});
