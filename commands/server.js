module.exports = {
	name: 'server',
	description: 'Server information',
	usage: ' ',
	cooldown: 5,
	execute(message, args) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};