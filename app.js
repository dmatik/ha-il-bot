const fs = require('fs');

// const config = require('./config.json');
// const token = config.token;
// const prefix = config.prefix;
// const haCheckInterval = config.haCheckInterval;
// const generalChannelID = config.generalChannelID;
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;
const haCheckInterval = process.env.HA_CHECK_INT;
const generalChannelID = process.env.GEN_CHANNEL_ID;

const haUrl = 'https://version.home-assistant.io/stable.json';
const rp = require('request-promise');

const db = require('quick.db');
// const db = new Quick.db('database');
const myLinks = new db.table('myLinks');


const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', async () => {
	console.log('Ready!');

	let haCurrVersion = '';
	haCurrVersion = db.get('haCurrVersion');


	if (!haCurrVersion) {
		haCurrVersion = await getNewHaVersion();
		try {
			db.set('haCurrVersion', haCurrVersion);
		}
		catch (error) {
			console.error('Could not set DB', error);
		}
	}

	if(!myLinks.get('hass')) {
		myLinks.set('hass', 'https://www.home-assistant.io/');
	}

	console.log(haCurrVersion);
	checkHaVersionLoop(haCurrVersion);
});

client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);
	try {
		command.execute(message, args, myLinks);
	}
	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}

});

client.login(token);

function getNewHaVersion() {
	return rp(haUrl).then(function(json) {
		const jsonObject = JSON.parse(json);
		const version = jsonObject.homeassistant.default;

		return version;
	});
}

function checkHaVersionLoop(haCurrVersion) {
	setTimeout(async function() {
		const haNewVersion = await getNewHaVersion();

		if (haNewVersion != haCurrVersion) {

			try {
				db.set('haCurrVersion', haNewVersion);
			}
			catch (error) {
				console.error('Could not update DB', error);
			}

			haCurrVersion = haNewVersion;
			console.log('HA updated to version: ' + haNewVersion);

			const embed = new Discord.MessageEmbed()
				.setDescription('[Release Notes](https://www.home-assistant.io/latest-release-notes/)')
				.setTitle('Home Assistant Updated')
				.addFields(
					{ name: 'New Version', value: haNewVersion, inline: false },
				);

			const generalChannel = client.channels.cache.get(generalChannelID);
			try {
				generalChannel.send(embed);
			}
			catch (error) {
				console.error('Could not send message to channel', error);
			}
		}

		checkHaVersionLoop(haCurrVersion);
	}, haCheckInterval);
}