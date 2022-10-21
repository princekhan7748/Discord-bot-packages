const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// Member Lost Role
client.on('guildMemberRoleRemove', (member, role) => {

	const LogChannel = client.channels.cache.get(server_log);
	const MemberRoleRemove = new MessageEmbed()
		.setTitle('User Lost Role!')
		.setColor('#2F3136')
		.setDescription(`**${member.user.tag}** lost the role \`${role.name}\``);

	return LogChannel.send({
		embeds: [MemberRoleRemove],
	});

});