const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');


// Member Started Boosting
client.on('guildMemberBoost', (member) => {

	const LogChannel = client.channels.cache.get(server_log);
	const MemberBoost = new MessageEmbed()
		.setTitle('User Started Boosting!')
		.setColor('#2F3136')
		.setDescription(`**${member.user.tag}** has started boosting  ${member.guild.name}!`);
	return LogChannel.send({
		embeds: [MemberBoost],
	});

});