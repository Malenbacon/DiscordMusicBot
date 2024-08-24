const {EventEmitter} = require("node:events");
const connectToChannel = require("./voiceConnection")

const commandCalled = new EventEmitter();

commandCalled.on("AddedToQueueEmpty", async (interaction) => {connectToChannel(interaction)} );
commandCalled.once("AddedToQueue", () => {

})
commandCalled.on("skip", () => {

})
commandCalled.on("stop", () => {
})
commandCalled.on("pause", () => {
})

module.exports = commandCalled;