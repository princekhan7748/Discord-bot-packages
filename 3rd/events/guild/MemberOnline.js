const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// Member Became Online
client.on('guildMemberOnline', (member, newStatus) => {

	const LogChannel = client.channels.cache.get(server_log);
	const MemberOnline = new MessageEmbed()
		.setTitle('Message Online')
		.setColor('#2F3136')
		.setDescription(member.user.tag + ' was offline and is now ' + newStatus + '!');

	return LogChannel.send({
		embeds: [MemberOnline],
	});

});