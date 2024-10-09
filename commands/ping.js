const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'ping pong :D',
	data: new SlashCommandBuilder(),
	async execute(interaction) {
		const embed = {
			title: '🏓 ping',
			description: `ping: ${interaction.client.ws.ping}ms`
		}

		interaction.reply({
			embeds: [
				embed
			]
		});
	}
}
