// const { SlashCommandBuilder } = require('discord.js');

// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('ping')
// 		.setDescription('Replies with Pong!'),
// 	async execute(interaction) {
// 		await interaction.reply('Pong!');
// 	},
// };

const https = require('https');

var postData = JSON.stringify({
  'content' : 'Hello Johnson!'
});

var options = {
  hostname: "discord.com",
  port: 443,
  path: '/api/webhooks/1047304219876675684/AxTCEvuiwHJ4BfPkD47N7mjZewuDMX6LUhEbY3kR-7mDbyqWv5g_dVu6x60gjIMaqLMT',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

var req = https.request(options, (res) => {
console.log('statusCode:', res.statusCode);
console.log('headers:', res.headers);

res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write(postData);
req.end();