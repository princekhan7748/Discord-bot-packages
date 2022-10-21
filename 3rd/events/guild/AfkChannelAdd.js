const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// AFK Channel Added
client.on('guildAfkChannelAdd', (guild, afkChannel) => {

	const LogChannel = client.channels.cache.get(server_log);
	const AFKAdd = new MessageEmbed()
		.setTitle('AFK Channel Added')
		.setColor('#2F3136')
		.setDescription(`${guild.name} has a new afk channel ${afkChannel}`);

	return LogChannel.send({
		embeds: [AFKAdd],
	});

});
