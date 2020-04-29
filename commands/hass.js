const rp = require('request-promise');
const url = 'https://home-assistant.io';

module.exports = {
	name: 'hass',
	description: 'Home Assistant information',
	usage: ' ',
	cooldown: 5,
	execute(message, args) {

		const data = [];


		getCurrentVersion().then(html => {
			data.push('Home Assitant');
			if (html[0]) data.push(`**Current Version:** ${html[0]}`);
			if (html[1]) data.push(`**Released:** ${html[1]}`);
			if (html[2]) data.push(`**Release Notes:** ${html[2]}`);
			message.channel.send(data, { split: true });
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