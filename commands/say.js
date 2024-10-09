const util = require('node:util');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'say',
	description: 'wymowa',
	data: new SlashCommandBuilder().
		addStringOption((opt) => opt.setName('data').setDescription('data').setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.get('data').value;

		const p1 = interaction.channel.send({ content: input, allowedMentions: { parse: [] }});
		const p2 = interaction.reply({ content: 'OK', ephemeral: true });

		return await Promise.all([p1, p2]);
	}
}
