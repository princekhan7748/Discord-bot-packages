const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');


// Role Permission Updated
client.on('rolePermissionsUpdate', (role, oldPermissions, newPermissions) => {

	const LogChannel = client.channels.cache.get(server_log);
	const RolePermissionUpdated = new MessageEmbed()
		.setTitle('Role Permission Updated')
		.setColor('#2F3136')
		.setDescription(role.name + ' had as permissions ' + oldPermissions + ' and now has as permissions ' + newPermissions);

	return LogChannel.send({
		embeds: [RolePermissionUpdated],
	});

});