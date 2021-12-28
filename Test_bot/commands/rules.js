const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rule')
		.setDescription('Gives the rules board'),
	async execute(interaction) {
		return interaction.reply
		(
			""
		);
	},
};
