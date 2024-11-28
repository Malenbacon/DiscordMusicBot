const clearEvent = require('../src/Handlers/voiceConnectionEventHandler.js')
const {getVoiceConnection} = require('@discordjs/voice')

module.exports = {
    name: "!clear",
    help:"Exclui todas musicas da fila incluindo a atual",
    async execute(interaction){
        const voiceConnection = getVoiceConnection(interaction.guildId);
        if(!voiceConnection) return interaction.reply("Nao estou nem na call brother")
        clearEvent.emit("clear");
    }
};