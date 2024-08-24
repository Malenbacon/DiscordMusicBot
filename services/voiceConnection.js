const {joinVoiceChannel, createAudioPlayer, VoiceConnectionStatus, AudioPlayerStatus} = require("@discordjs/voice")
const ytdl = require("ytdl-core");


const player = createAudioPlayer()

const connectToChannel = async (interaction) => {
    try 
    {
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.member.voice.channel.guildId,
            adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator,
        });

        return interaction.reply(`Tocando: `)

    } catch (e) {
        const connection = getVoiceConnection(interaction.member.voice.channel.guildId);
    }
}

module.exports = connectToChannel

