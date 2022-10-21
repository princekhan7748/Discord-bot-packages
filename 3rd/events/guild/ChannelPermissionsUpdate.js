const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// Channel Permission Updating
client.on('guildChannelPermissionsUpdate', (channel, oldPermissions, newPermissions) => {

	const LogChannel = client.channels.cache.get(server_log);
	const PermissionUpdate = new MessageEmbed()
		.setTitle('Permission Updated!')
		.setColor('#2F3136')
		.setDescription(`${channel.name}'s permissions updated!"
        New permissions: ${newPermissions} 
		Old permissions: ${oldPermissions}`);

	return LogChannel.send({
		embeds: [PermissionUpdate],
	});

});