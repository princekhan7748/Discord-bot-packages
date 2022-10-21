const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');


// Member Became Offline
client.on('guildMemberOffline', (member, oldStatus) => {

	const LogChannel = client.channels.cache.get(server_log);
	const MemberOffline = new MessageEmbed()
		.setTitle('Message Offline')
		.setColor('#2F3136')
		.setDescription(`<@${member.user.tag}>` + ' became offline!' + 'with status: ' + oldStatus);

	return LogChannel.send({
		embeds: [MemberOffline],
	});

});
