const removeEvent =  require('../src/Handlers/voiceConnectionEventHandler.js')
const {queueMusics} = require("../Server.js")
const {getVoiceConnection} = require('@discordjs/voice')

module.exports = {
    name: "!remove",
    help:"Remove uma musica da fila dada certa posicao",
    async execute(interaction){
        const voiceConnection = getVoiceConnection(interaction.guildId);
        if(!voiceConnection) return interaction.reply("Nao estou nem na call brother")
        if(queueMusics.length === 0) return;
        removeEvent.emit("remove",interaction);
    }
};