const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// Guild Vanity Add
client.on('guildVanityURLAdd', (guild, vanityURL) => {

	const LogChannel = client.channels.cache.get(server_log);
	const VanityAdd = new MessageEmbed()
		.setTitle('Vanity Link Added')
		.setColor('#2F3136')
		.setDescription(`${guild.name} has a vanity link ${vanityURL}`);

	return LogChannel.send({
		embeds: [VanityAdd],
	});

});