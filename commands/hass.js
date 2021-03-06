const rp = require('request-promise');
const url = 'https://home-assistant.io';
const Discord = require('discord.js');

// const { prefix } = require('../config.json');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const prefix = process.env.PREFIX;

module.exports = {
	name: 'hass',
	description: 'Home Assistant information',
	usage: prefix + 'hass',
	cooldown: 5,
	execute(message, args) {

		getCurrentVersion().then(html => {
			const embed = new Discord.MessageEmbed()
				.setTitle('Home Assistant')
				.setDescription(`[Release Notes](${html[2]})`)
				.addFields(
					{ name: 'Current Version', value: `${html[0]}`, inline: true },
					{ name: 'Released', value: `${html[1]}`, inline: true },
					// { name: 'Release Notes', value: `[Release Notes](${html[2]})` },
				);

			message.channel.send(embed);
		});

	},
};


function getCurrentVersion() {
	return rp(url).then(function(dom) {
		let ind = dom.indexOf('current-version material-card text');
		let sub = dom.substr(ind, 1000);
		let dat = sub;
		let link = sub;
		ind = sub.indexOf('<h1>');
		sub = sub.substr(ind).substr(4);
		ind = sub.indexOf('<');
		sub = sub.substring(0, ind).replace('Current Version: ', '').trim();

		ind = dat.indexOf('release-date', 0);
		dat = dat.substr(ind + 14, 100);
		ind = dat.indexOf('<');
		dat = dat.substring(0, ind);

		ind = link.indexOf('href');

		link = link.substr(ind + 6, 100);
		// console.log(link);
		ind = link.indexOf('"');
		link = url + link.substring(0, ind);


		return [sub, dat, link];
	});
}