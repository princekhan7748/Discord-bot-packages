const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// Server Boost Level Up
client.on('guildBoostLevelUp', (guild, oldLevel, newLevel) => {

	const LogChannel = client.channels.cache.get(server_log);
	const LevelUp = new MessageEmbed()
		.setTitle('Server Boost Level Up')
		.setColor('#2F3136')
		.setDescription(`${guild.name} reached the boost level ${newLevel}`);

	return LogChannel.send({
		embeds: [LevelUp],
	});

});