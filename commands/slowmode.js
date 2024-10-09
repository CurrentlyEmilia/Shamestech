const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'slowmode',
	description: 'Limit prędkości!!',
	data: new SlashCommandBuilder().
		addIntegerOption((opt) => opt.setName('limit').setDescription('limit').setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.roles.cache.some((role) => role.id === '1292143685588226089'))
		if (!interaction.member.roles.cache.some((role) => role.id === '1291140425956065311'))
		if (!interaction.member.roles.cache.some((role) => role.id === '1291140683209637908')) {
			return interaction.reply('Brak permisji.');
		};

		const ratelimit = interaction.options.get('limit');

		await interaction.channel.setRateLimitPerUser(ratelimit.value);

		return interaction.reply('OK\n');
	}
}
