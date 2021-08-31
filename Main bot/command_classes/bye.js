// exports.run = async (bot,message,args) => {
//     let member = message.mentions.members.first();
//     if(!member) { message.channel.send('Bye');} else {
//         message.channel.send(`Bye ${member.user.tag}`)
//     }
// }

// exports.help = {
// name: 'bye'
// }

const Command = require("../include/command")

class ByeCommand extends Command {
    constructor() {
        super("Bye", "Literally makes you leave the server", "Why are you still reading? Go do your own business");
    }

    run(bot, message, args) 
    {
        message.channel.send("Bye dumbass");
    }
}

module.exports = ByeCommand;