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
	name: 'fuse',
	async execute(message) {
		if ((message.member.roles.cache.some(role => role.id === '1292143685588226089') || message.member.roles.cache.some(role => role.id === '1291140425956065311') || message.member.roles.cache.some(role => role.id === '1291140683209637908')) && globalThis.promptFlip2) {
			if (globalThis.promptFlip) {
				globalThis.promptFlip = false;
			} else {
				globalThis.promptFlip = true;
			}
		}

		return await message.reply({
			content: `fuse status: ${globalThis.promptFlip ? 'alright' : 'nope'}`
		});
	}
}

