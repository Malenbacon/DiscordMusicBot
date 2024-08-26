const {getVoiceConnection} = require('@discordjs/voice')
const {EventEmitter} = require("node:events");
const connectToChannel = require("../Connection/voiceConnection.js")
const voiceEmitter = require('../Handlers/voiceConnectionEventHandler.js');
const {queueMusics} = require('../../Server.js')

const commandCalled = new EventEmitter();

commandCalled.on("AddedToQueueEmpty", async (interaction) => {connectToChannel(interaction)} );
commandCalled.on("AddedToQueue", async(interaction) => 
{
    if(getVoiceConnection(interaction.guildId) == undefined) connectToChannel(interaction)
})
commandCalled.on("skip", (interaction) => {
    queueMusics.shift();
    voiceEmitter.emit("beginPlay", interaction)
})
commandCalled.on("stop", () => {
})
commandCalled.on("pause", () => {
    // voiceEmitter.emit("resume")
})
commandCalled.on("resume", () => {
    // voiceEmitter.emit('resume')
})

module.exports = commandCalled;