const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// Avatar Updated
client.on('userAvatarUpdate', (user, oldAvatarURL, newAvatarURL) => {

	const LogChannel = client.channels.cache.get(server_log);
	const AvatarUpdated = new MessageEmbed()
		.setTitle('Avatar Updated')
		.setColor('#2F3136')
		.setDescription(`${user.tag} updated avatar from [Old Avatar](${oldAvatarURL}) to [New Avatar(${newAvatarURL})]`);

	return LogChannel.send({
		embeds: [AvatarUpdated],
	});

});