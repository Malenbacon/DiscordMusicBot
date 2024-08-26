const EventEmitter = require('node:events');
const {queueMusics} = require('../../Server.js')

const voiceEvents = new EventEmitter();

voiceEvents.on("skip", async(interaction) => {
    console.log("fUi de skipped")
    queueMusics.shift();
    voiceEvents.emit("beginPlay", interaction)
});

module.exports = voiceEvents;