const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'warn',
	description: 'warn',
	data: new SlashCommandBuilder().
		addUserOption((opt) => opt.setName('victim').setDescription('user').setRequired(true)).
		addStringOption((opt) => opt.setName('reason').setDescription('reason').setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.roles.cache.some((role) => role.id === '1292143685588226089'))
		if (!interaction.member.roles.cache.some((role) => role.id === '1291140425956065311'))
		if (!interaction.member.roles.cache.some((role) => role.id === '1291140683209637908')) {
			return interaction.reply('Brak permisji!');
		};
		const victim = interaction.options.get('victim');
		const reason = interaction.options.get('reason').value;

		if (!globalThis.profile.doesUserHaveAProfile(victim.value)) {
			globalThis.profile.reinitialiseUserProfile(victim.value);
		};

		const warns = globalThis.moderative.warnUser(victim.value);

		console.error(victim);

		return interaction.reply(`Ostrzeżono <@${victim.value}>. To jest jej ${globalThis.odmianyCyfr[warns]} ostrzeżenie`);
	}
}
