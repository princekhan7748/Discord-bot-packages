const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// VC Defean
client.on('voiceChannelDeaf', (member, deafType) => {

	const LogChannel = client.channels.cache.get(server_log);
	const VCDeafen = new MessageEmbed()
		.setTitle('User Deafend')
		.setColor('#2F3136')
		.setDescription(member.user.tag + ' become deafed! With deaf type:' + deafType);

	return LogChannel.send({
		embeds: [VCDeafen],
	});

});
