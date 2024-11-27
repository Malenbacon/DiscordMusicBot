const {getVoiceConnection} = require('@discordjs/voice')
const {EventEmitter} = require("node:events");
const connectToChannel = require("../Connection/voiceConnection.js")

const commandCalled = new EventEmitter();

commandCalled.on("AddedToQueueEmpty", async (interaction) => {connectToChannel(interaction)} );
commandCalled.on("AddedToQueue", async(interaction) => 
{
    if(getVoiceConnection(interaction.guildId) == undefined) connectToChannel(interaction)
})

module.exports = commandCalled;