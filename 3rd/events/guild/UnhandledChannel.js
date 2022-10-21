const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');


// unhandled Guild Channel Update
client.on('unhandledGuildChannelUpdate', (oldChannel, newChannel) => {

	const LogChannel = client.channels.cache.get(server_log);
	const unhandledGuildChannelUpdate = new MessageEmbed()
		.setTitle('Channel Updated!')
		.setColor('#2F3136')
		.setDescription('Channel \'' + `<#${oldChannel.id}>` + '\' was edited but discord-logs couldn\'t find what was updated...' + `<#${newChannel.id}>`);

	return LogChannel.send({
		embeds: [unhandledGuildChannelUpdate],
	});

});