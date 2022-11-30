// // require('dotenv').config();
// require('dotenv').config();
// // import the BOT_TOKEN from the .env file
// const { BOT_TOKEN } = process.env;

const { BOT_TOKEN } = require('./config.json')

// import node's native file system (fs) module
const fs = require('node:fs');

// import node's native path system module 
const path = require('node:path');

// import Client, Events, and GatewayIntentBits objects from discord.js
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

// create new client
const client = new Client({ intents: [GatewayIntentBits.Guilds,
                                      GatewayIntentBits.GuildMessages,
                                      // GatewayIntentBits.MessageContent,
                                    ] 
                          });

// populate a new Collection accessed via client.commands which
// contains as the key: the command name, 
// and as the value: the exported module from each .js file inside /commands
client.commands = new Collection();    

// locate the files inside the commands folder with .js extension
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// loop over those files with .js extension
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// log a ready message once connected
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});


// EVENT LISTENER LOGIC
// when your bot receives a Client#event:interactionCreate event,
// we can parse all the needed information from the interaction object.
client.on(Events.InteractionCreate, async interaction => {

	// break if the interaction object is a ChatInputCommand
	if (!interaction.isChatInputCommand()) return;
	// console.log(interaction);

	// retrieve the relevant commans from #Client.commands
	// #Client.commands is accessed via interaction.client
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

// client.on('messageCreate', async (message) => {
//   console.log(message)
// })

// login using the BOT_TOKEN
client.login(BOT_TOKEN);








// const pingServer = () => {
//   fetch(`/https://discord.com/api/webhooks/1047304219876675684/AxTCEvuiwHJ4BfPkD47N7mjZewuDMX6LUhEbY3kR-7mDbyqWv5g_dVu6x60gjIMaqLMT`, {
//     "method": "POST",
//     "body": JSON.stringify({
//       "content": "Houston, hello."
//     }),
//     "headers": {
//       "Content-Type": "application/json"
//     }
//   })
// }
