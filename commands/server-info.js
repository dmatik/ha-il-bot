const Discord = require('discord.js');

module.exports = {
	name: 'server-info',
	description: 'Server information',
	usage: ' ',
	cooldown: 5,
	execute(message, args) {

		const totalOnlineMembers = message.guild.members.cache.filter((m) => m.presence.status != 'offline').size;

		const totalTextChannels = message.guild.channels.cache.filter((c) => c.type === 'text').size;
		const totalVoiceChannels = message.guild.channels.cache.filter((c) => c.type === 'voice').size;
		const totalCategories = message.guild.channels.cache.filter((c) => c.type === 'category').size;

		const embed = new Discord.MessageEmbed()
			.addFields(
				{ name: 'Owner', value: message.guild.owner.user.tag, inline: true },
				{ name: 'Server Created', value: message.guild.createdAt.getDate()
					+ '/' + (message.guild.createdAt.getMonth() + 1)
					+ '/' + message.guild.createdAt.getFullYear(),
				inline: true },
				{ name: 'Roles', value: message.guild.roles.cache.size, inline: true },
				{ name: 'Memebers', value: message.guild.memberCount + ' members\n'
					+ totalOnlineMembers + ' online\n', inline: true },
				{ name: 'Channels', value: message.guild.channels.cache.size + ' channels:\n'
					+ totalCategories + ' categories\n'
					+ totalTextChannels + ' text, '
					+ totalVoiceChannels + ' voice',
				inline: true },
			)
			.setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
			.setFooter(`Server Name: ${message.guild.name}`);

		message.channel.send(embed);

	},
};