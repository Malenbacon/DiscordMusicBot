const pauseEvent = require("../src/Handlers/voiceConnectionEventHandler");
const {getVoiceConnection} = require('@discordjs/voice')

module.exports = {
    name: "!pause",
    help:"Pausa a musica atual",
    async execute(interaction){
        const voiceConnection = getVoiceConnection(interaction.guildId);
        if(!voiceConnection) return interaction.reply("Nao estou nem na call brother")
        pauseEvent.emit("pause");
        await interaction.reply(`Pararão a musica atual`);
    }
};