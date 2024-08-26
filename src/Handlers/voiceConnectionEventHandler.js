const EventEmitter = require('node:events');
const {queueMusics} = require('../../Server.js')

const voiceEvents = new EventEmitter();

voiceEvents.on("skip", async(interaction) => {
    queueMusics.shift();
    voiceEvents.emit("beginPlay", interaction)
});

// other listeners are in Connection/beginPlayMusic

module.exports = voiceEvents;