const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'snipe',
	description: 'sniper monkey',
	data: new SlashCommandBuilder(),
	async execute(interaction) {
		const snipeData = globalThis.snipeStore.get(interaction.channel.id);

		await interaction.deferReply();
		
		if (snipeData === undefined) {
			return await interaction.editReply({
				embeds: [
					{
						color: 0xa83232,
						description: 'zesrałem się'
					}
				]
			});
		}

		return await interaction.editReply({
			embeds: [
				{
					color: 0x32a852,
					author: {
						icon_url: snipeData.avatar_url,
						name: `${snipeData.displayName} (${snipeData.authorId})`
					},
					description: `${snipeData.content}`,
					timestamp: new Date().toISOString(),
					footer: {
						text: `Requested by ${interaction.user.username} (${interaction.user.id})`
					}
				}
			]
		});
	}
}
