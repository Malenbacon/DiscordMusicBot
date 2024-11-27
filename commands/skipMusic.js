const skipEvent = require("../src/Handlers/voiceConnectionEventHandler.js")
const {getVoiceConnection} = require('@discordjs/voice');

module.exports = {
    name: "!skip",
    help:"Pula a musica atual",
    async execute(interaction){
        const voiceConnection = getVoiceConnection(interaction.guildId);
        if(!voiceConnection) return interaction.reply("Nao estou nem na call brother")
        skipEvent.emit("skip", interaction)
        return;
    }
};