const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');


// Member Got Role
client.on('guildMemberRoleAdd', (member, role) => {

	const LogChannel = client.channels.cache.get(server_log);
	const MemberRoleAdd = new MessageEmbed()
		.setTitle('User Got Role!')
		.setColor('#2F3136')
		.setDescription(`**${member.user.tag}** got the role \`${role.name}\``);

	return LogChannel.send({
		embeds: [MemberRoleAdd],
	});

});
