const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// VC Undefean
client.on('voiceChannelUndeaf', (member, deafType) => {

	const LogChannel = client.channels.cache.get(server_log);
	const VCUndeafen = new MessageEmbed()
		.setTitle('User Undeafend')
		.setColor('#2F3136')
		.setDescription(member.user.tag + ' become undeafed! with deaftype: ' + deafType);

	return LogChannel.send({
		embeds: [VCUndeafen],
	});

});
