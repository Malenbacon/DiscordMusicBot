const {getVoiceConnection} = require('@discordjs/voice')
let eventEmitter = require('../src/Handlers/voiceConnectionEventHandler')

module.exports = {
    name: "!quit",
    help:"Sai da call e zera a fila de musicas a tocar",
    async execute(interaction){
        const voiceConnection = getVoiceConnection(interaction.guildId);
        if(!voiceConnection) return interaction.reply("Nao estou nem na call brother")
        eventEmitter.emit("quit", interaction);
    }
};