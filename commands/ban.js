const Discord = require('discord.js');

// const { prefix, incidentChannelID } = require('../config.json');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const prefix = process.env.PREFIX;
const incidentChannelID = process.env.INC_CHANNEL_ID;

module.exports = {
	name: 'ban',
	description: 'Ban member',
	usage: prefix + 'ban [user] (Optional reason)',
	cooldown: 5,
	execute(message, args) {

		const banUser = (message.mentions.users.first() || message.guild.members.cache.get(args[0]));
		if(!banUser) return message.reply('you need to mention a user in order to ban them!');

		let banReason = args.join(' ').slice(22);
		if(banReason === '') banReason = 'None';

		if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('you are not allowed to ban!');

		const banMember = message.mentions.members.first();
		if(!banMember) return message.reply('mentioned user must be a member of this server!');
		if(banMember.bannable == false) return message.reply('you are not allowed!');

		const embed = new Discord.MessageEmbed()
			.setTitle('Ban')
			.addFields(
				{ name: 'Banned User', value: `${banUser.tag} with ID ${banUser.id}`, inline: false },
				{ name: 'Banned By', value: `${message.author.tag} with ID ${message.author.id}`, inline: false },
				{ name: 'Banned In', value: message.channel.name, inline: false },
				{ name: 'Time', value: message.createdAt, inline: false },
				{ name: 'Reason', value: banReason, inline: false },
			)
			.setColor('#e56b00');

		const banChannel = message.guild.channels.cache.get(incidentChannelID);
		if(!banChannel) return message.reply('can\'t find incidents channel.');

		message.guild.member(banUser).ban(banReason);
		banChannel.send(embed);
	},
};