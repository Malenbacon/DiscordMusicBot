const {queueMusics, stackHistoryMusic} = require('../Server.js');
const { voiceEmitter } = require('../src/Connection/beginPlayMusic');
const {getVoiceConnection} = require('@discordjs/voice')
module.exports = {
    name: "!back",
    help: "Retrocede uma musica que ja tocou",
    async execute(interaction){
        const voiceConnection = getVoiceConnection(interaction.guildId);
        if(!voiceConnection) return interaction.reply("Nao estou nem na call brother");
        if(stackHistoryMusic.length == 0) return interaction.reply("Nao ha nenhuma musica no historico");
        voiceEmitter.emit('back', interaction)
    }
}