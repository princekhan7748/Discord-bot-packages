const Command = require("../include/command");

class HelpCommand extends Command {
  constructor() {
    super("help", "Display Help Text", "Show help for commands. Specify the command to show detail.");
  }

  run(bot, message, args) {
    if (!args || !Array.isArray(args) || args.length == 0) {
      // No args
      const text = Array.from(bot.commandClasses.values())
        .map((c) => `${c.name}: ${c.description}`)
        .join("\n");
      message.channel.send(`Available Bot commands: \n${text}`);
    } else {
        const cmd = bot.commandClasses.get(args[0].toLowerCase());
        if (!cmd) {
            message.channel.send(`I couldn't find a command called ${args[0]}`);
        } else {
            message.channel.send(`**${cmd.name}**\n*${cmd.description}*\n\n${cmd.helpText}\n\n`);
        }
    }
  }
}

module.exports = HelpCommand;