const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');


// Username Updated
client.on('userUsernameUpdate', (user, oldUsername, newUsername) => {

	const LogChannel = client.channels.cache.get(server_log);
	const Username = new MessageEmbed()
		.setTitle('Username Updated')
		.setColor('#2F3136')
		.setDescription(`${user.tag} updated thier username from ${oldUsername} to ${newUsername}`);

	return LogChannel.send({
		embeds: [Username],
	});

});
