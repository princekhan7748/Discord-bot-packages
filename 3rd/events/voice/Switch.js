const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// VC Switch
client.on('voiceChannelSwitch', (member, oldChannel, newChannel) => {

	const LogChannel = client.channels.cache.get(server_log);
	const VCSwitch = new MessageEmbed()
		.setTitle('Voice Channel Switched')
		.setColor('#2F3136')
		.setDescription(member.user.tag + ' left ' + oldChannel.name + ' and joined ' + newChannel.name + '!');

	return LogChannel.send({
		embeds: [VCSwitch],
	});

});
