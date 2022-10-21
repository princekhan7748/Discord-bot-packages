const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// Joined VC
client.on('voiceChannelJoin', (member, channel) => {

	const LogChannel = client.channels.cache.get(server_log);
	const VCJoined = new MessageEmbed()
		.setTitle('Voice Channel Joined')
		.setColor('#2F3136')
		.setDescription(member.user.tag + ' joined ' + `${channel}` + '!');

	return LogChannel.send({
		embeds: [VCJoined],
	});

});