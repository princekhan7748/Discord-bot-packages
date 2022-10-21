const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// Discriminator Updated
client.on('userDiscriminatorUpdate', (user, oldDiscriminator, newDiscriminator) => {

	const LogChannel = client.channels.cache.get(server_log);
	const Discriminator = new MessageEmbed()
		.setTitle('Discriminator Updated')
		.setColor('#2F3136')
		.setDescription(`${user.tag} updated thier discriminator from ${oldDiscriminator} to ${newDiscriminator}`);

	return LogChannel.send({
		embeds: [Discriminator],
	});

});