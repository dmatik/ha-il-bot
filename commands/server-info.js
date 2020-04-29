const Discord = require('discord.js');

module.exports = {
	name: 'server-info',
	description: 'Server information',
	usage: ' ',
	cooldown: 5,
	execute(message, args) {

		message.guild.members.fetch().then(fetchedMembers => {
			const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');

			const embed = new Discord.MessageEmbed()
				.addFields(
					{ name: 'Owner', value: message.guild.owner.user.username, inline: true },
					{ name: 'Server Created', value: message.guild.createdAt.getDate() + '/' + (message.guild.createdAt.getMonth() + 1) + '/' + message.guild.createdAt.getFullYear(), inline: true },
					{ name: 'Roles', value: message.guild.roles.holds.length, inline: true },
					{ name: 'Memebers', value: message.guild.memberCount + ' members\n' + totalOnline.size + ' online\n', inline: true },
					{ name: 'Channels', value: message.guild.channels.holds.length, inline: true },
				)
				.setFooter(`Server name: ${message.guild.name}`);

			message.channel.send(embed);
		});

	},
};