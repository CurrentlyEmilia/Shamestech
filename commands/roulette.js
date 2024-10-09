const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'roulette',
	description: 'ruletka',
	data: new SlashCommandBuilder(),
	async execute(interaction) {
		if (Math.floor(Math.random() * 100) >= 25) {
			return interaction.reply('Przegrałaś!');
		} else {
			return interaction.reply('Wygrałaś!');
		}
	}
}
