let {queueMusics, commandCalled, stackHistoryMusic} = require('../../Server.js');

const skip = (interaction) => {
    stackHistoryMusic.push(queueMusics.shift());
    commandCalled.emit("beginPlay", interaction)
    console.log('chamei o brabo')
}

commandCalled.on("skip", (interaction) => {
    skip(interaction);
})

module.exports = skip;