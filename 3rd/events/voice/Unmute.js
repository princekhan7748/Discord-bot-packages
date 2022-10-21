const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// VC Unmute
client.on('voiceChannelUnmute', (member, oldMuteType) => {

	const LogChannel = client.channels.cache.get(server_log);
	const VCUnmute = new MessageEmbed()
		.setTitle('User Unmuted')
		.setColor('#2F3136')
		.setDescription(member.user.tag + ' became unmuted! with mutetype:' + oldMuteType);

	return LogChannel.send({
		embeds: [VCUnmute],
	});

});
