const { prefix } = require('../config.json');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	usage: prefix + 'ping',
	cooldown: 5,
	execute(message, args) {
		message.channel.send('Pong!');
	},
};