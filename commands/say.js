const util = require('node:util');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'say',
	description: 'wymowa',
	data: new SlashCommandBuilder().
		addStringOption((opt) => opt.setName('data').setDescription('data').setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.get('data').value;

		if (input.length >= 1000) {
			return await interaction.reply({
				content: 'Content too long!'
			});
		}

		if (interaction.channel === null) {
			console.log(`no: ${interaction.user.id}`);
			return;
		}

		const p1 = interaction.channel.send({
			content: input,
			allowedMentions: { parse: [] }
		});
		const p2 = interaction.reply({ content: 'OK\nplease follow the rules kthxbye :3', ephemeral: true });
		const p3 = interaction.client.channels.cache.get('1292871719077286001').send({
			content: `user: <@!${interaction.user.id}>\ncontent: ${input}`,
			allowedMentions: { parse: [] }
		});

		return await Promise.all([p1, p2]);
	}
}
