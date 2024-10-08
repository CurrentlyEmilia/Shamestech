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
const fs = require('node:fs');

const dotenv = require('dotenv');
const { Client, GatewayIntentBits } = require('discord.js');

globalThis.config = require('./config.json');
dotenv.config();

globalThis.snipeStore = new Map();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.DirectMessages
	]
});
globalThis.client = client;

globalThis.reloadEvents = () => {
	client.removeAllListeners();

	const eventsDir = fs.readdirSync(config.directories.eventsDir).filter((fileName) => fileName.endsWith('.js'));

	for (let i = 0; i < eventsDir.length; i += 1) {
		const eventModulePath = path.join(process.cwd(), config.directories.eventsDir, eventsDir[i]);

		const eventModule = require(eventModulePath);

		if (typeof eventModule.name !== 'string' || typeof eventModule.execute !== 'function') {
			console.error(`${eventModulePath} is not a valid event module`);
			break;
		}

		client.on(eventModule.name, eventModule.execute);
	}
}

process.on('unhandledRejection', async (a) => {
	console.error(a);
});

globalThis.reloadEvents();

client.login(process.env.DISCORD_BOT_TOKEN);
