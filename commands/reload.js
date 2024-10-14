const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'reload',
	description: 'reload commands!!',
	data: new SlashCommandBuilder(),
	async execute(interaction) {
		if (interaction.user.id !== '1257636259258568777') {
			return await interaction.reply({
				content: 'please go fuck yourself kthxbye'
			});
		}

		globalThis.reloadCommands();

		interaction.reply({
			content: 'OK'
		});
	}
}
