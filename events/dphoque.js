module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if (message.content.includes('d\'phoque') || message.content.includes('dphoque')) {
			return await message.channel.send({
				content: `shut your bitch ass up <@!${message.author.id}> 💜 I PURPLE YOU 🫰`
			});
		}
	}
}
