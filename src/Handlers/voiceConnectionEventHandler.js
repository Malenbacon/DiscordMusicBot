const EventEmitter = require('node:events');
const {queueMusics, stackHistoryMusic} = require('../../Server.js');

const voiceEvents = new EventEmitter();

voiceEvents.on("skip", async(interaction) => {
    stackHistoryMusic.push(queueMusics.shift());
    voiceEvents.emit("beginPlay", interaction)
});

voiceEvents.on('back', async(interaction) => {
    queueMusics.unshift(stackHistoryMusic.pop());
    voiceEvents.emit("beginPlay", interaction)
})

voiceEvents.on('clear', async(interaction) => {
    while(queueMusics.length > 0){
        queueMusics.pop();
    }
    voiceEvents.emit("beginPlayClear", interaction)
})


// other listeners are in Connection/beginPlayMusic

module.exports = voiceEvents;