module.exports = {
	name: 'ping',
	description: 'Ping!',
	usage: ' ',
	cooldown: 5,
	execute(message, args) {
		message.channel.send('Pong!');
	},
};