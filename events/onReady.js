const { ActivityType } = require('discord.js');

globalThis.statuses = [
	{
		name: 'twelveM — Love & Live',
		type: ActivityType.Streaming,
		url: 'https://youtube.com/watch?v=tNVR2McnWz8'
	},
	{
		name: 'NoramotoP - Electric Chair',
		type: ActivityType.Streaming,
		url: 'https://www.youtube.com/watch?v=7YQDYg-F4Dk'
	},
	{
		name: '【東方】Bad Apple!! ＰＶ【影絵】',
		type: ActivityType.Streaming,
		url: 'https://www.youtube.com/watch?v=FtutLA63Cp8'
	}
]

let i = 0;

function switchStatus() {
	globalThis.client.user.setPresence({
		activities: [statuses[i]],
		status: 'online'
	});

	i++;
	if (statuses.length === i) i = 0;
}

module.exports = {
	name: 'ready',
	async execute() {
		console.error('OK');

		setInterval(switchStatus, 12000);
		switchStatus();
	}
}
