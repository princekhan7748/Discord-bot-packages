const Discord = require('discord.js') 
const bot = new Discord.Client({
  intents:
    Discord.Intents.FLAGS.GUILDS |
    Discord.Intents.FLAGS.GUILD_MEMBERS |
    Discord.Intents.FLAGS.GUILD_MESSAGES |
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS |
    Discord.Intents.FLAGS.DIRECT_MESSAGES |
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
});
const fs = require("fs")
const path = require("path");
bot.commands = new Discord.Collection();
bot.commandClasses = new Map();

bot
  .on("error", (e) => {
    console.error(e);
  })
  .on("warn", (e) => {
    console.warn(e);
  })
  .on("debug", (e) => {
    console.log(e);
  });

function loadCommandClasses(folder) {
    const base = path.resolve(__dirname, folder);
    fs.readdir(base, (err, files) => {
      if (err) return console.log(err);

      let jsfile = files.filter((f) => f.split(".").pop() == "js");

      if (jsfile.length <= 0) return console.log("Could not find commands!");

      jsfile.forEach((f) => {
        let props = require(`${base}/${f}`);
        let cmd = new props();
        bot.commandClasses.set(cmd.name, cmd);
      });
    });

}

bot.on('ready', () => {
    console.log('Bot online')

    loadCommandClasses("command_classes");
    console.log(bot.guilds.cache);
})

bot.on('messageCreate', (message) => {
    if(message.author.bot) return;
    if(message.channel.type != "GUILD_TEXT") return;

    let prefix = '!';
    // hello there ['hello', 'there']
    // !ban user reason ['user', 'reason']
    // Breaking Rules ['breaking', 'rules'] breaking rules
    // hello
    let MessageArray = message.content.split(' ');
    let cmd = MessageArray[0].slice(prefix.length)
    let args = MessageArray.slice(1)

    if(!message.content.startsWith(prefix)) return;

    // Test command classes first
    let commandFile = bot.commandClasses.get(cmd.toLowerCase());
    console.log(cmd, cmd.toLowerCase(), commandFile);
    if (commandFile) {
        try {
        commandFile.run(bot, message, args);
        } catch (e) {
            console.log({e});
        }
        return;
    }
    commandfile = bot.commands.get(cmd);
    if(commandfile) {commandfile.run(bot,message,args)}

})

bot.on('guildMemberUpdate', (oldMember, newMember) => {
    if(oldMember.nickname !== newMember.nickname) {
        newMember.send('You changed your nickname!')
    }
    let oldAvatar = oldMember.user.avatarURL() // https://link.com
    let newAvatar = newMember.user.avatarURL(); // https://link.com
    if(oldAvatar !== newAvatar) {
        newMember.send('Your avatar has changed!')
    }
    
    
})

// !ctc @Sam 

bot.on('guildMemberAdd', (member) => {
    let embed = new Discord.MessageEmbed()
    .setTitle('Welcome to my server!')
    .setDescription(`Thank you for joining my server! Make sure to stay active and talk to the other members!\n**Current Member Count:** ${member.guild.memberCount}\n**Owner:** ${member.guild.owner.user.tag}`)
    .setColor('#cc3300')
    .setAuthor(member.guild.owner.user.tag, member.guild.owner.user.avatarURL())
    .setFooter(member.guild.name, member.guild.iconURL())
    .setThumbnail(member.user.avatarURL());

    member.send(embed)
})
loadCommandClasses("command_classes")
bot.login('NzQ2NDU0NDU0MzUzNzg4OTc5.X0Aj4g.ANULycNAuw96Ls0JnwJqadsbSlg');
