const { SlashCommandBuilder } = require('@discordjs/builders');
const {makeEmbed} = require('../embed');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('rule')
		.setDescription('IDK'),
	async execute(interaction) {
		return interaction.reply({ embeds: [ makeEmbed("oldMmessage.content", 'https://i.imgur.com/AfFp7pu.png', 'https://i.imgur.com/AfFp7pu.png', 'username', 'Nothing', 'usertag', 'sentchannel') ] });
	},
};
