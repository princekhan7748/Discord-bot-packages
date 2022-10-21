const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// Left VC
client.on('voiceChannelLeave', (member, channel) => {

	const LogChannel = client.channels.cache.get(server_log);
	const VCLeft = new MessageEmbed()
		.setTitle('Voice Channel Left')
		.setColor('#2F3136')
		.setDescription(member.user.tag + ' left ' + `${channel}` + '!');

	return LogChannel.send({
		embeds: [VCLeft],
	});

});