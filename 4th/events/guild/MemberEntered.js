const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// Member Joined
client.on('guildMemberEntered', (member) => {

	const LogChannel = client.channels.cache.get(server_log);
	const MemberJoined = new MessageEmbed()
		.setTitle('User Joined')
		.setColor('#2F3136')
		.setDescription(`${member.user.tag} Joined!`);

	return LogChannel.send({
		embeds: [MemberJoined],
	});

});