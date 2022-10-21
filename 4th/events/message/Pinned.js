const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('../../channel.json');


// Message Pinned
client.on('messagePinned', (message) => {

	const LogChannel = client.channels.cache.get(server_log);
	const MessagePinned = new MessageEmbed()
		.setTitle('Message Pinned')
		.setColor('#2F3136')
		.setDescription('This message has been pinned : ' + message);

	return LogChannel.send({
		embeds: [MessagePinned],
	});

});