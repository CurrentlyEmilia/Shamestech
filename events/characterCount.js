module.exports = {
	name: 'messageCreate',
	async execute(message) {
		let chars = globalThis.db.get(`leveling_${message.guild.id}_${message.author.id}_characters`);
		let msgCount = globalThis.db.get(`leveling_${message.guild.id}_${message.author.id}_messageCount`);
	
		if (chars === undefined) {
			chars = message.content.length;
		} else {
			chars = chars + message.content.length;
		}

		if (msgCount === undefined) {
			msgCount = 1;
		} else {
			msgCount++;
		}

		globalThis.db.set(`leveling_${message.guild.id}_${message.author.id}_characters`, chars);
		globalThis.db.set(`leveling_${message.guild.id}_${message.author.id}_messageCount`, msgCount);
		return;
	}
}
