const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');

// Banner Added
client.on('guildBannerAdd', (guild, bannerURL) => {

	const LogChannel = client.channels.cache.get(server_log);
	const BannerAdd = new MessageEmbed()
		.setTitle('Server Got a new banner')
		.setColor('#2F3136')
		.setImage(bannerURL);

	return LogChannel.send({
		embeds: [BannerAdd],
	});

});