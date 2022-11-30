const { BOT_TOKEN } = require('./config.json')

// import node's native file system (fs) module
// import node's native path system module 
const fs = require('node:fs');
const path = require('node:path');

// import Client, Events, and GatewayIntentBits objects from discord.js
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { msgServerViaWebHook } = require('./commands/auto-ping.js')

// create new client
const client = new Client({ intents: [GatewayIntentBits.Guilds,
                                      GatewayIntentBits.GuildMessages,
                                      GatewayIntentBits.MessageContent,
                                    ] 
                          });


// log a ready message once connected
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	msgServerViaWebHook("We ready.")
});

client.on('messageCreate', async (message) => {
  console.log(message.content)
})

// login using the BOT_TOKEN
client.login(BOT_TOKEN);

// // SLASH COMMANDS LOGIC
// // populate a new Collection accessed via client.commands which
// // contains as the key: the command name, 
// // and as the value: the exported module from each .js file inside /commands
// client.commands = new Collection();    

// // locate the files inside the commands folder with .js extension
// const commandsPath = path.join(__dirname, 'commands');
// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// // loop over those files with .js extension
// for (const file of commandFiles) {
// 	const filePath = path.join(commandsPath, file);
// 	const command = require(filePath);
// 	// Set a new item in the Collection with the key as the command name and the value as the exported module
// 	if ('data' in command && 'execute' in command) {
// 		client.commands.set(command.data.name, command);
// 	} else {
// 		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
// 	}
// }

// // EVENT LISTENER LOGIC
// // when your bot receives a Client#event:interactionCreate event,
// // we can parse all the needed information from the interaction object.
// client.on(Events.InteractionCreate, async interaction => {
// 	// break if the interaction object is a ChatInputCommand
// 	if (!interaction.isChatInputCommand()) return;
	
// 	// retrieve the relevant commans from #Client.commands
// 	// #Client.commands is accessed via interaction.client
// 	const command = interaction.client.commands.get(interaction.commandName);

// 	if (!command) {
// 		console.error(`No command matching ${interaction.commandName} was found.`);
// 		return;
// 	}

// 	try {
// 		console.error(`we found ${interaction.commandName} was found.`);
// 		await command.execute(interaction);
// 	} catch (error) {
// 		console.error(error);
// 		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
// 	}

// });
