const {getVoiceConnection} = require('@discordjs/voice')

module.exports = {
    name: "!quit",
    help:"Sai da call e zera a fila de musicas a tocar",
    async execute(interaction){
        const voiceConnection = getVoiceConnection(interaction.guildId);
        if(!voiceConnection) return interaction.reply("Nao estou nem na call brother")
        voiceConnection.destroy();
        await interaction.reply(`Saindo...`);
    }
};