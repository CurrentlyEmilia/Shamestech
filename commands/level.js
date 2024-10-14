const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'level',
	description: 'level',
	data: new SlashCommandBuilder(),
	async execute(interaction) {
		let chars = globalThis.db.get(`leveling_${interaction.guild.id}_${interaction.user.id}_characters`);
		let msgCount = globalThis.db.get(`leveling_${interaction.guild.id}_${interaction.user.id}_messageCount`);

		return await interaction.reply({
			content: `hai ${interaction.user.displayName}!!\nyour stats, across the messages I monitored:\nYou sent ${chars} characters\nYou sent ${msgCount} messages\nYour messages had, on average, ${Math.floor(chars/msgCount)} characters per message (rounded down).`
		});
	}
}
