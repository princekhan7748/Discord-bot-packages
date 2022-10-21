const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// VC Mute
client.on('voiceChannelMute', (member, muteType) => {

	const LogChannel = client.channels.cache.get(server_log);
	const VCMute = new MessageEmbed()
		.setTitle('User Muted')
		.setColor('#2F3136')
		.setDescription(member.user.tag + ' became muted! (type: ' + muteType + ')');

	return LogChannel.send({
		embeds: [VCMute],
	});

});
