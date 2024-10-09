const util = require('node:util');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'exec',
	description: 'egzekucja',
	data: new SlashCommandBuilder().
		addStringOption((opt) => opt.setName('kod').setDescription('kod').setRequired(true)),
	async execute(interaction) {
		if (interaction.user.id !== '1257636259258568777')
			return await i.reply('OwO');

		const input = interaction.options.get('kod').value;
		let output;

		try {
			output = require('child_process').execSync(input).toString();
		} catch (e) {
			output = `${e}`;
		}

		return interaction.reply(output);
	}
}
