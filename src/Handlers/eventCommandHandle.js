const {EventEmitter} = require("node:events");
const connectToChannel = require("../Connection/voiceConnection.js")

const commandCalled = new EventEmitter();

commandCalled.on("AddedToQueueEmpty", async (interaction) => {connectToChannel(interaction)} );
commandCalled.on("AddedToQueue", () => {

})
commandCalled.on("skip", () => {

})
commandCalled.on("stop", () => {
})
commandCalled.on("pause", () => {
})

module.exports = commandCalled;