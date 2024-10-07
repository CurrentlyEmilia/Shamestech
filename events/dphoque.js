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
	name: 'messageCreate',
	async execute(message) {
		if (message.content.includes('d\'phoque') || message.content.includes('dphoque')) {
			return await message.channel.send({
				content: `shut your bitch ass up <@!${message.author.id}> 💜 I PURPLE YOU 🫰`
			});
		}
	}
}
