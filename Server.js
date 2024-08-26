require('dotenv').config();
const { Client, Events, GatewayIntentBits} = require('discord.js');
const commandHandler = require("./src/Handlers/commandHandler.js");

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent]});
let queueMusics = [];
let stackHistoryMusic = [];

client.once(Events.ClientReady, (readyClient) => { console.log(`Ready! Logged in as ${readyClient.user.tag}`)
});

client.on(Events.MessageCreate, (mensage) => {commandHandler(mensage)})

client.login(process.env.TOKEN);

module.exports = {queueMusics, stackHistoryMusic, client};