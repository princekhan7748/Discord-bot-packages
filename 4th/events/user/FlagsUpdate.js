const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// Flags Updated
client.on('userFlagsUpdate', (user, oldFlags, newFlags) => {

	const LogChannel = client.channels.cache.get(server_log);
	const FlagsUpdate = new MessageEmbed()
		.setTitle('Flags Updated')
		.setColor('#2F3136')
		.setDescription(`${user.tag} updated thier flags from ${oldFlags} to ${newFlags}`);

	return LogChannel.send({
		embeds: [FlagsUpdate],
	});

});