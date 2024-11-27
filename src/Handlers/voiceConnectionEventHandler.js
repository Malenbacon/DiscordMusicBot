const EventEmitter = require('node:events');
const {queueMusics, stackHistoryMusic} = require('../../Server.js');

const voiceEvents = new EventEmitter();

voiceEvents.on("skip", async(interaction) => {
    stackHistoryMusic.push(queueMusics.shift());
    voiceEvents.emit("beginPlay", interaction)
    console.log('chamei o brabo')
});

voiceEvents.on('back', async(interaction) => {
    queueMusics.unshift(stackHistoryMusic.pop());
    voiceEvents.emit("beginPlay", interaction)
})

// other listeners are in Connection/beginPlayMusic

module.exports = voiceEvents;