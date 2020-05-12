// const { prefix } = require('../config.json');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const prefix = process.env.PREFIX;

module.exports = {
	name: 'ping',
	description: 'Ping!',
	usage: prefix + 'ping',
	cooldown: 5,
	execute(message, args) {

		if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('MODERATOR')) {
			return message.reply('you are not allowed!');
		}

		message.channel.send('Pong!');
	},
};