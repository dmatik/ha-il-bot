const { prefix } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: prefix + 'help (Optional command name)',
	cooldown: 5,
	execute(message, args) {
		const { commands } = message.client;

		if (args.length == 0) {

			const embed = new Discord.MessageEmbed()
				.setTitle('Help')
				.setDescription(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`)
				.setFooter(`Requested by: ${message.author.tag}`);

			for (const command of commands) {
				embed.addField('`' + prefix + command[1].name + '`', command[1].description, false);
			}

			return message.channel.send(embed);
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		const embed = new Discord.MessageEmbed()
			.setTitle('Help `' + prefix + command.name + '`')
			.setDescription(command.description)
			.addField('Usage', '`' + command.usage + '`', false)
			.setFooter(`Requested by: ${message.author.tag}`);

		message.channel.send(embed);
	},
};