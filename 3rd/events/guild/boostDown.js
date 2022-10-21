const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// Server Boost Level Down
client.on('guildBoostLevelDown', (guild, oldLevel, newLevel) => {

	const LogChannel = client.channels.cache.get(server_log);
	const LevelDown = new MessageEmbed()
		.setTitle('Server Boost Level Down')
		.setColor('#2F3136')
		.setDescription(`${guild.name} lost a level from ${oldLevel} to ${newLevel}`);

	return LogChannel.send({
		embeds: [LevelDown],
	});

});
