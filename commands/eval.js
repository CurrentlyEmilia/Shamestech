const util = require('node:util');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'eval',
	description: 'evaluation',
	data: new SlashCommandBuilder().
		addStringOption((opt) => opt.setName('kod').setDescription('kod').setRequired(true)),
	async execute(interaction) {
		if (interaction.user.id !== '1257636259258568777') {
			console.log(`${interaction.user.id} tried to eval`);
			return await interaction.reply('OwO');
		}

		const input = interaction.options.get('kod').value;
		let output;

		try {
			output = await util.inspect(eval(input));
		} catch (e) {
			output = `${e}`;
		}

		return interaction.reply(output);
	}
}
