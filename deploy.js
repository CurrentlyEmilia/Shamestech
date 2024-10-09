const process = require('node:process');
const path = require('node:path');
const fs = require('node:fs');

const { SlashCommandBuilder, REST, Routes, Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const config = require('./config.json');

const commands = [];

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds
	]
});

const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN);

function main()
{
	const cmdDirScan = fs.readdirSync(config.directories.commandsDir).filter((fileName) => fileName.endsWith('.js'));

	for (let i = 0; i < cmdDirScan.length; i++) {
		const cmdModuleFileName = cmdDirScan[i];

		const cmdModulePath = path.join(process.cwd(), config.directories.commandsDir, cmdModuleFileName);

		const cmdModule = require(cmdModulePath);

		if (typeof cmdModule?.name !== 'string') {
			throw new TypeError(`cmdModule.name expected to have type of string, not type of ${typeof cmdModule.name}!!`);
		}

		if (typeof cmdModule?.description !== 'string') {
			throw new TypeError(`cmdModule.name expected to have type of string, not type of ${typeof cmdModule.name}!!`);
		}

		if (typeof cmdModule.execute !== 'function') {
			throw new TypeError(`cmdModule.execute expected to have type of function, not type of ${typeof cmdModule.execute}!!`);
		}

		if (!(cmdModule.data instanceof SlashCommandBuilder)) {
			throw new TypeError(`cmdModule.data expected to be an instance of SlashCommandBuilder!!`);
		}

		const cmd = cmdModule.data;

		cmd.name = cmdModule.name;
		cmd.description = cmdModule.description;

		commands.push(cmd.toJSON());
	}
}
main();

client.on('ready', async () => {
	process.stderr.write('a\n');

	try {
		const data = await rest.put(
			Routes.applicationCommands(client.user.id),
			{ body: commands }
		);
	} catch (e) {
		console.error(e);
	} finally {
		client.destroy();
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);
