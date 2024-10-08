/*
 * Copyright (C) 2024 Emilia Luminé <eqilia@national.shitposting.agency>
 * This file is a part of the Shamestech bot.
 * 
 * The Shamestech bot is free software: you can redistribute it and/or modify it
 * under the terms of the European Union Public License as published by
 * by the European Union, only the version 1.2 of the License.
 * 
 * The Shamestech bot is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the 
 * European Union Public License for more details.
 * 
 * You should have received a copy of the European Union Public License, If not
 * see <https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12>
*/

const path = require('node:path');
const util = require('node:util');
const fs = require('node:fs');

const { Collection } = require('discord.js');

globalThis.commands = new Collection();

globalThis.commandsReload = () => {
	globalThis.commands = new Collection();

	console.error('commands:');

	const commandsDir = fs.readdirSync(config.directories.commandsDir).filter((fileName) => fileName.endsWith('.js'));

	for (let i = 0; i < commandsDir.length; i += 1) {
		const commandModulePath = path.join(process.cwd(), config.directories.commandsDir, commandsDir[i]);

		const commandModule = require(commandModulePath);

		if (typeof commandModule.name !== 'string' || typeof commandModule.execute !== 'function') {
			console.error(`${commandModulePath} is not a valid command module`);
			continue;
		}

		commands.set(commandModule.name, commandModule);

		console.log(`\t${commandsDir[i]} -> ${commandModule.name}`);
	}
}

globalThis.commandsReload();

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if (message.author.bot) return;

		let prefix = false;

		for (let i = 0; i < config.prefixes.length; i += 1) {
			const configuredPrefix = config.prefixes[i];

			if (message.content.startsWith(configuredPrefix)) {
				prefix = configuredPrefix;
				break;
			}
		}

		if (!prefix) {
			return;
		}

		if (message.author.id === '1248993299646124162') {
			return await message.reply('As explained on the server "Gay sxe place with no sxe", you have been banned from this bot. Please do not try to use the bot again.\nFor a quick reminder, here is the letter:\n\nHello Twissted,\n\nI am contacting you to inform that your abuse of the bot has been detected.\nYour access to the bot has been therefore revoked. Please do not try further to access the bot.\n\nThe attachment below contains the content for the reason which you were blocked.\n\nKind regards,\nEmilia.\n\nhttps://flush.eqilia.gay/image2.png');
		}

		const args = message.content.slice(prefix.length).trim().split(/ +/gmi);
		const command = globalThis.commands.get(args[0]);

		if (!command) {
			return;
		}

		try {
			await command.execute(message, args.slice(1), globalThis.client);
		} catch (e) {
			console.error(e);
			return await message.reply({
				content: `an error occurred\n${e}\nplease contact the bot developer`
			});
		}
	}
}

