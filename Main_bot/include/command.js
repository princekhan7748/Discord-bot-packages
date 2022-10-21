const { Message } = require("discord.js");

class Command {

    constructor(name, description, helpText) {
        this.name = name.toLowerCase();
        this.description = description;
        this.helpText = helpText;
    }

    /**
     * 
     * @param {Message} msg 
     * @param {*} args  could be string or array depending on message handler
     */
    async run(bot, msg, args) {
        msg.channel.send("no run() method specified.");
    }

}

module.exports = Command;