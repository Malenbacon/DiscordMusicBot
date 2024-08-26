const {joinVoiceChannel, getVoiceConnection} = require("@discordjs/voice")
const {voiceEmitter} = require('../Connection/beginPlayMusic')


const connectToChannel = async (interaction) => {
    try 
    {
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.member.voice.channel.guildId,
            adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator,
        });

        voiceEmitter.emit('beginPlay', interaction);

    } catch (e) {
        const connection = getVoiceConnection(interaction.guildId);
        connection.destroy();
        return interaction.reply("Ouve um erro na conexão... tente denovo")
    }
}

module.exports = connectToChannel

