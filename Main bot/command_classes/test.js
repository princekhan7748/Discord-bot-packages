const Command = require("../include/command")

class TestCommand extends Command {
    constructor() {
        super("test", "Test Command for a Bot", "This could be more expensive help text");
    }

    run(bot, message, args) {
        message.channel.send("Here is what I got: \n```" + JSON.stringify(args, null, 3) + "\n```");
    }
}

module.exports = TestCommand;