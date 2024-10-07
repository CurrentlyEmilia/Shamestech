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

const util = require('node:util');

let fuseMap = [];

module.exports = {
	name: 'say',
	async execute(message, args) {
		const prompt = args.join(' ');

		if (globalThis.promptFlip) {
			if (fuseMap.includes(message.author.id)) return;

			fuseMap.push(message.author.id);
			await message.reply('retard');

			return;
		}

		const p1 = message.channel.send({
			content: prompt,
			allowedMentions: { parse: [] }
		});
		const p2 = message.delete();

		return await Promise.all([p1, p2]);
	}
}

