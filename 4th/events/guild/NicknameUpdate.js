const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// Nickname Changed
client.on('guildMemberNicknameUpdate', (member, oldNickname, newNickname) => {

	const LogChannel = client.channels.cache.get(server_log);
	const MemberNicknameUpdate = new MessageEmbed()
		.setTitle('Nickname Updated')
		.setColor('#2F3136')
		.setDescription(`${member.user.tag} changed nickname from \`${oldNickname}\` to \`${newNickname}\``);

	return LogChannel.send({
		embeds: [MemberNicknameUpdate],
	});

});