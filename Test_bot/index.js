const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });	
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
require('./interactions/messageCreate')(client)
require('./interactions/messageUpdate')(client)
require('./interactions/messageDelete')(client)
require('./interactions/interactionCreate')(client)
require('./interactions/channelCreate')(client)
for (const file of commandFiles) 
{
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}


client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);
