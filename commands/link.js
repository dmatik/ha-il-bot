const Discord = require('discord.js');

module.exports = {
	name: 'link',
	description: 'Dynamic system to store useful links',
	usage: '[@alias] / [@command]',
	cooldown: 5,
	// linksMap: '',
	execute(message, args, links) {

		if(!args.length) {
			return message.reply('please specify alias or command');
		}

		const linkCommand = args.shift().toLowerCase();

		if(linkCommand === 'add') {
			if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('MODERATOR')) {
				return message.reply('you are not allowed!');
			}

			const alias = args.shift().toLowerCase();
			const linkValue = args.join(' ');

			if(links.get(alias)) return message.reply('link \'' + alias + '\' already exists.');
			links.set(alias, linkValue);

			message.reply('link \'' + alias + '\' added successfully.');
		}
		else if(linkCommand === 'update') {
			if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('MODERATOR')) {
				return message.reply('you are not allowed!');
			}

			const alias = args.shift().toLowerCase();
			const linkValue = args.join(' ');

			if(!links.get(alias)) return message.reply('link \'' + alias + '\' does not exists.');
			links.set(alias, linkValue);

			message.reply('link \'' + alias + '\' updated successfully.');
		}
		else if(linkCommand === 'delete') {
			if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('MODERATOR')) {
				return message.reply('you are not allowed!');
			}

			const alias = args.shift().toLowerCase();

			if(!links.get(alias)) return message.reply('link \'' + alias + '\' does not exists.');
			links.delete(alias);

			message.reply('link \'' + alias + '\' deleted successfully.');
		}
		else if(linkCommand === 'all') {
			const embed = new Discord.MessageEmbed()
				.setTitle('Links')
				.setFooter(`Requested by: ${message.author.tag}`);

			const linksList = links.all();
			for (const link of linksList) {
				embed.addField(link.ID, link.data.toString().substr(1).slice(0, -1), false);
			}

			message.channel.send(embed);
		}
		else {
			const linkValue = links.get(linkCommand);
			if(!linkValue) return message.reply('link \'' + linkCommand + '\' does not exists.');

			const embed = new Discord.MessageEmbed()
				.setTitle('Link \'' + linkCommand + '\'')
				.setDescription(linkValue)
				.setFooter(`Requested by: ${message.author.tag}`);

			message.channel.send(embed);
		}

	},

};