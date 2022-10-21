const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// Member Unboosted
client.on('guildMemberUnboost', (member) => {

	const LogChannel = client.channels.cache.get(server_log);
	const MemberUnboost = new MessageEmbed()
		.setTitle('User Stoped Boosting!')
		.setColor('#2F3136')
		.setDescription(`**${member.user.tag}** has stopped boosting  ${member.guild.name}!`);

	return LogChannel.send({
		embeds: [MemberUnboost],
	});

});