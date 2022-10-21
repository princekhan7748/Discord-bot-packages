const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// User Started to Stream
client.on('voiceStreamingStart', (member, voiceChannel) => {

	const LogChannel = client.channels.cache.get(server_log);
	const UserStreaming = new MessageEmbed()
		.setTitle('User Started to Stream')
		.setColor('#2F3136')
		.setDescription(member.user.tag + ' started streaming in ' + voiceChannel.name);

	return LogChannel.send({
		embeds: [UserStreaming],
	});

});