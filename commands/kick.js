module.exports = {
	name: 'kick',
	description: 'Kick member',
	usage: '[@user]',
	cooldown: 5,
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.reply('you need to mention a user in order to kick them!');
		}

		const taggedUser = message.mentions.users.first();
		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	},
};