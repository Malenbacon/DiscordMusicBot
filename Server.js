require('dotenv').config();
const { Client, Events, GatewayIntentBits} = require('discord.js');
const commandHandler = require("./services/commandHandler.js");

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent]});

client.once(Events.ClientReady, (readyClient) => { console.log(`Ready! Logged in as ${readyClient.user.tag}`)
});

client.on(Events.MessageCreate, (mensage) => {commandHandler(mensage)})

client.login(process.env.TOKEN);