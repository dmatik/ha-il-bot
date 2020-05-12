const Discord = require('discord.js');

// const { prefix } = require('../config.json');
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const prefix = process.env.PREFIX;

module.exports = {
	name: 'server-info',
	description: 'Server information',
	usage: prefix + 'server-info [user]',
	cooldown: 5,
	execute(message, args) {

		if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('MODERATOR')) {
			return message.reply('you are not allowed!');
		}

		const totalOnlineMembers = message.guild.members.cache.filter((m) => m.presence.status != 'offline').size;
		const totalBots = message.guild.members.cache.filter((m) => m.user.bot == true).size;
		const totalHumans = message.guild.members.cache.filter((m) => m.user.bot == false).size;

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
					+ totalOnlineMembers + ' online\n'
					+ totalBots + ' bots, '
					+ totalHumans + ' humans',
				inline: true },
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