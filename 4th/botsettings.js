const client = require('./index');
const { MessageEmbed } = require('discord.js');
const { server_log } = require('./channel.json');

client.on('ready', () => {
	client.user.setActivity('Your browsing history will be compromised', { type: 'PLAYING' });
});