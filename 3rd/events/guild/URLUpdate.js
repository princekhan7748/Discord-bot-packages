const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');


// Guild Vanity Link Updated
client.on('guildVanityURLUpdate', (guild, oldVanityURL, newVanityURL) => {

	const LogChannel = client.channels.cache.get(server_log);
	const VanityUpdated = new MessageEmbed()
		.setTitle('Vanity Link Updated')
		.setColor('#2F3136')
		.setDescription(`${guild.name} has changed its vanity URL from ${oldVanityURL} to ${newVanityURL}!`);

	return LogChannel.send({
		embeds: [VanityUpdated],
	});

});