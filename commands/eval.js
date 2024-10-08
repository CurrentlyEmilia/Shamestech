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

module.exports = {
	name: 'eval',
	async execute(message, args) {
		const prompt = args.join(' ');
		let out = '';

		if (message.author.id !== '1257636259258568777') {
			return await message.reply({
				content: 'Sorry, permission denied.'
			});
		}

		try {
			out = util.inspect(eval(prompt));
		} catch (e) {
			out = `${e}`
		}

		return await message.reply({
			content: `${out.length === 0 ? 'empty' : out}`
		});
	}
}
