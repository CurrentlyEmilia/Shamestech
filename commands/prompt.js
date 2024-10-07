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

const os = require('node:os');

const { Ollama } = require('ollama');
const ollama = new Ollama();

globalThis.model = 'command-r:35b-08-2024-q2_K'

module.exports = {
	name: 'prompt',
	async execute(message, args) {
		let str = '';
		let msg;
		let int;

		if (os.hostname() !== 'cyproterone') {
			return await message.reply({
				content: `im sorry im not running on the pc rn\nbai`
			});
		}

		if (globalThis.db.get(`prompt_cr00_${message.author.id}`) !== 'alright') {
			message.reply({
				content: 'so like the llm under this is licensed under CC BY-NC 4.0 International Public\nlink: https://creativecommons.org/licenses/by-nc/4.0/legalcode.en\nthe specific model is https://ollama.com/library/command-r:35b-08-2024-q2_K\nkthxbye'
			});
			globalThis.db.set(`prompt_cr00_${message.author.id}`, 'alright');
		}

		if (message.channel.id === '1291139733375684651' && globalThis.promptFlip) {
			return await message.reply('please go to <#1292417901390729236>');
		}

		msg = await message.reply({
			content: 'pls wait'
		});

		const prompt = args.join(' ');
		const response = await ollama.chat({
			model: globalThis.model,
			messages: [
				{ role: 'system', content: 'Please type your responses in a very short manner, all in informal lowercase' },
				{ role: 'user', content: prompt }
			],
			stream: true
		});

		int = setInterval(() => {
			msg.edit({
				content: `${str.length === 0 ? 'kewl' : str}`
			});
		}, 800);

		for await (const part of response) {
			str = `${str}${part.message.content}`
		}

		msg.edit({
			content: `${str.length === 0 ? 'kewl' : str}`
		});

		clearInterval(int);
	}
}
