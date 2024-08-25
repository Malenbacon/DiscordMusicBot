const clearEvent = require('../src/Handlers/eventCommandHandle.js')

module.exports = {
    name: "!clear",
    help:"Exclui todas musicas da fila incluindo a atual",
    async execute(interaction){
        const voiceConnection = getVoiceConnection(interaction.guildId);
        if(!voiceConnection) return interaction.reply("Nao estou nem na call brother")
        stopEvent.emit("clear");
        await interaction.reply(`Exluindo todas musicas que iriam ser tocadas...`);
    }
};