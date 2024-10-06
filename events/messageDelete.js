/*
 * Copyright (C) 2024 Emilia Luminé <eqilia@national.shitposting.agency>
 * This file is a part of the Shamestech bot.
 * 
 * The Shamestech bot is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by
 * by the Free Software Foundation, solely the version 3 of the License.
 * 
 * The Shamestech bot is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the 
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License, If not
 * see <https://www.gnu.org/licenses>
*/

module.exports = {
	name: 'messageDelete',
	async execute(message) {
		let data = {
			displayName: message.author.id,
			content: message.content,
			authorId: message.author.id,
			avatarURL: 'https://flush.eqilia.gay/shame.png'
		}

		if (typeof message.author.username === 'string') {
			data.displayName = message.author.username;
		}
		if (typeof message.author.displayName === 'string') {
			data.displayName = message.author.displayName;
		}
		if (typeof message.member.nickname === 'string') {
			data.displayName = message.member.nickname;
		}

		if (typeof message.author.avatarURL === 'function') {
			let res;

			res = message.author.avatarURL();
			if (res !== null) {
				data.avatarURL = res;
			}
		}
		if (typeof message.member.avatarURL === 'function') {
			let res;

			res = message.member.avatarURL();
			if (res !== null) {
				data.avatarURL = res;
			}
		}

		globalThis.snipeStore.set(message.channel.id, data);

		return;
	}
}
