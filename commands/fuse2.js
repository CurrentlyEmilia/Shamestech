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

module.exports = {
	name: 'fuse2',
	async execute(message) {
		if (message.author.id === '335102389017378818' || message.author.id === '1257636259258568777') {
			if (globalThis.promptFlip2) {
				globalThis.promptFlip2 = false;
			} else {
				globalThis.promptFlip2 = true;
			}
		}

		return await message.reply({
			content: `fuse status: ${globalThis.promptFlip2 ? 'nope' : 'alright'}`
		});
	}
}

