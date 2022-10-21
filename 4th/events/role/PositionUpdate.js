const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');


// Role Position Updated
client.on('rolePositionUpdate', (role, oldPosition, newPosition) => {

	const LogChannel = client.channels.cache.get(server_log);
	const RolePositionUpdated = new MessageEmbed()
		.setTitle('Role Position Updated')
		.setColor('#2F3136')
		.setDescription(role.name + ' role was at position ' + oldPosition + ' and now is at position ' + newPosition);

	return LogChannel.send({
		embeds: [RolePositionUpdated],
	});

});