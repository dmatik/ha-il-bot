const Discord = require('discord.js');

// const { prefix } = require('../config.json');
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const prefix = process.env.PREFIX;

module.exports = {
	name: 'user-info',
	description: 'User information',
	usage: prefix + 'user-info [user]',
	cooldown: 5,
	execute(message, args) {

		if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('MODERATOR')) {
			return message.reply('you are not allowed!');
		}

		if (!message.mentions.users.size) {
			return message.reply('you need to mention a user!');
		}

		const user = message.mentions.users.first();
		const member = message.mentions.members.first() || message.member;
		const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
		const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

		const roles = [];
		roles.push(member.roles.cache.map(role => role.name).join(', '));

		const embed = new Discord.MessageEmbed()
			.addFields(
				{ name: 'User', value: user.tag + '\nID: ' + user.id, inline: true },
				{ name: 'Roles', value: roles, inline: true },
				{ name: 'Joined Discord at', value: days[user.createdAt.getDay()] + ', '
                    + months[user.createdAt.getMonth()] + ' '
                    + user.createdAt.getDate() + ', '
                    + user.createdAt.getFullYear() + '\n'
                    + user.createdAt.getHours() + ':'
                    + user.createdAt.getMinutes(),
				inline: true },
				{ name: 'Joined Server at', value: days[member.joinedAt.getDay()] + ', '
                    + months[member.joinedAt.getMonth()] + ' '
                    + member.joinedAt.getDate() + ', '
                    + member.joinedAt.getFullYear() + '\n'
                    + member.joinedAt.getHours() + ':'
                    + member.joinedAt.getMinutes(),
				inline: true },
			)
			.setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
			.setFooter(`Requested by: ${message.author.tag}`);

		message.channel.send(embed);
	},
};