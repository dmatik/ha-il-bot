const Discord = require('discord.js');

// const { prefix, incidentChannelID } = require('../config.json');
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const prefix = process.env.PREFIX;
const incidentChannelID = process.env.INC_CHANNEL_ID;

module.exports = {
	name: 'kick',
	description: 'Kick member',
	usage: prefix + 'kick [user] (Optional reason)',
	cooldown: 5,
	execute(message, args) {

		const kickUser = (message.mentions.users.first() || message.guild.members.cache.get(args[0]));
		if(!kickUser) return message.reply('you need to mention a user in order to kick them!');

		let kickReason = args.join(' ').slice(22);
		if(kickReason === '') kickReason = 'None';

		if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('you are not allowed!');

		const kickMember = message.mentions.members.first();
		if(!kickMember) return message.reply('mentioned user must be a member of this server!');
		if(kickMember.kickable == false) return message.reply('you are not allowed!');

		const embed = new Discord.MessageEmbed()
			.setTitle('Kick')
			.addFields(
				{ name: 'Kicked User', value: `${kickUser.tag} with ID ${kickUser.id}`, inline: false },
				{ name: 'Kicked By', value: `${message.author.tag} with ID ${message.author.id}`, inline: false },
				{ name: 'Kicked In', value: message.channel.name, inline: false },
				{ name: 'Time', value: message.createdAt, inline: false },
				{ name: 'Reason', value: kickReason, inline: false },
			)
			.setColor('#e56b00');

		const kickChannel = message.guild.channels.cache.get(incidentChannelID);
		if(!kickChannel) return message.reply('can\'t find incidents channel.');

		message.guild.member(kickUser).kick(kickReason);
		kickChannel.send(embed);
	},
};