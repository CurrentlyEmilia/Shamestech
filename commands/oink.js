const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'gavel',
	description: 'this command is not meant for you.',
	data: new SlashCommandBuilder().
		addStringOption((opt) => opt.setName('a').setDescription('a').setRequired(true)).
		addStringOption((opt) => opt.setName('b').setDescription('b').setRequired(true)).
		addStringOption((opt) => opt.setName('c').setDescription('c').setRequired(true)).
		addStringOption((opt) => opt.setName('d').setDescription('d').setRequired(true)),
	async execute(interaction) {
		if (interaction.user.id !== '1257636259258568777') {
			return await interaction.reply('Forget about this.');
		};

		let gbanStatus = {};

		gbanStatus.time = interaction.options.get('b').value === 'Infinity' ? Infinity : (Date.now() + require('ms')(interaction.options.get('b').value));
		gbanStatus.reason = interaction.options.get('c').value;
		gbanStatus.appealable = interaction.options.get('d') !== 'n';

		globalThis.db.set(`gban_${interaction.user.id}`, gbanStatus);

		return interaction.reply(`${true}`);
	}
}
