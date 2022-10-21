const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('intro')
		.setDescription('Beep!'),
	async execute(interaction) {
		return interaction.reply('Coca cola khele baba hobar somvabona kome jabe 🙂👍!');
	},
};
