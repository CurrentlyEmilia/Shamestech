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

const { Ollama } = require('ollama');
const Mutex = require('mutex-promise');

const ollama = new Ollama();

globalThis.chatmutex = new Mutex('phosphoribosylaminoimidazolesuccinocarboxamide');

const chat = [
	{ role: 'system', content: 'Please type your responses in a very short manner, all in informal lowercase.\nYou are on discord. All your responses will be appended with your nickname and a colon, however the user messages will contain this format: "{username}: {content}". Your responses should be plaintext responses, do not append a nickname.' },
];

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		let str = '';
		let int;
		let msg;

		console.log(message.mentions.users.some((user) => user.id === message.client.user.id));

		if (!message.mentions.users.some((user) => user.id === message.client.user.id)) return;
		if (message.author.id === message.client.user.id) return;

		await globalThis.chatmutex.promise();
		globalThis.chatmutex.lock();

		chat.push({
			role: 'user',
			content: `${message.author.username}: ${message.content}`
		});

		const response = await ollama.chat({
			model: globalThis.model,
			messages: chat,
			stream: true
		});

		int = setInterval(async () => {
			if (msg === undefined) {
				msg = await message.reply({
					content: `${str.length === 0 ? 'empty' : str}`
				});
			} else {
				msg.edit({
					content: `${str.length === 0 ? 'empty' : str}`
				});
			}
		}, 800);

		for await (const part of response) {
			str = `${str}${part.message.content}`
		}

		if (msg === undefined) {
			msg = await message.reply({
				content: `${str.length === 0 ? 'empty' : str}`
			});
		} else {
			msg.edit({
				content: `${str.length === 0 ? 'empty' : str}`
			});
		}

		chat.push({
			role: 'assistant',
			content: str
		});

		clearInterval(int);

		globalThis.chatmutex.unlock();
	}
}
