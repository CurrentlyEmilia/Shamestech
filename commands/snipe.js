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
	name: 'snipe',
	async execute(message) {
		const snipeData = globalThis.snipeStore.get(message.channel.id);
		let data = {};
		let user;

		if (snipeData === undefined) {
			return await message.reply({
				embeds: [
					{
						color: 0xa83232,
						description: 'i have shat myself'
					}
				]
			});
		}

		user = message.client.users.cache.get(snipeData.authorId);
		if (user === undefined) {
			try {
				user = await message.client.user.cache.fetch(snipeData.authorId);
			} catch (e) {
				data.displayname = 'unavailable';
				data.username = 'unavailable';
				data.avatar = 'https://flush.eqilia.gay/shame.png';
			}
		}

		return await message.reply({
			embeds: [
				{
					color: 0x32a852,
					author: {
						icon_url: `${snipeData.avatarURL}`,
						name: `${snipeData.displayName} (${user.username})`
					},
					description: `${snipeData.content}`,
					timestamp: new Date().toISOString(),
					footer: {
						text: `Requested by ${message.author.username} (${message.author.id})`
					}
				}
			]
		});
	}
}
