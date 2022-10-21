const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });	
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const {makeEmbed} = require('./embed');
const { server_log } = require('./channel.json');



client.on("messageCreate", async (message) => {
    try 
	{
       if (message.author.bot) return;
	   const avatar = message.author.displayAvatarURL({ dynamic: true })
	   const username = message.author.username
	   const link = message.url
	   const usertag = `<@${message.author.id}>`
	   const sentchannel = `<#${message.channelId}>`
       const channel = await client.channels.fetch(server_log);
	   const urls = message.attachments.map(x => x.url).join("\n") ;
	   await channel.send({ embeds: [ makeEmbed(message.content, urls, avatar, username, link, usertag, sentchannel) ] });
    } 
	catch (error) 
	{
        console.error({error});
        
    }

  });

  client.on("messageUpdate", async (oldMmessage, newMessage) => {  
	  try
	  {
		  
		  const channel = await client.channels.fetch(server_log);
		  if (newMessage.content.length > 200)
		  {
			  
			  await channel.send({ embeds: [ makeEmbed(oldMmessage.content, 'https://i.imgur.com/AfFp7pu.png', 'https://i.imgur.com/AfFp7pu.png', 'username', 'Nothing', 'usertag', 'sentchannel') ] });
			  await channel.send({ embeds: [ makeEmbed(newMessage.content, 'https://i.imgur.com/AfFp7pu.png', 'https://i.imgur.com/AfFp7pu.png', 'username', 'Nothing', 'usertag', 'sentchannel') ] });
			}
		  await channel.send({ embeds: [ makeEmbed(oldMmessage.content, 'https://i.imgur.com/AfFp7pu.png', 'https://i.imgur.com/AfFp7pu.png', 'username', newMessage.content, 'usertag', 'sentchannel') ] });

	  }
	  catch (error)
	  {
		  console.error({error})
	  }
  });

for (const file of commandFiles) 
{
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try 
	{
		await command.execute(interaction);
	} 
	catch (error) 
	{
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);
