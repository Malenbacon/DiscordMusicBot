const {getVoiceConnection, createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState, StreamType} = require('@discordjs/voice')
let {queueMusics, client} = require('../../Server.js')
const voiceEmitter = require("../Handlers/voiceConnectionEventHandler.js")
const checkIfIsYoutubeDomain = require("../../services/checkIfIsYoutubeDomain.js");
const ytdl = require("@distube/ytdl-core");
const prism = require('prism-media')

const playMusic = async (interaction) => {
  try {
    if(queueMusics.length !== 0){
      const audioPlayer = createAudioPlayer();
      const connection = getVoiceConnection(interaction.guildId);
      connection.subscribe(audioPlayer);
      if(checkIfIsYoutubeDomain(queueMusics[0])){
          let stream =  ytdl(queueMusics[0], { filter: 'audioonly'});
          let transcoder = new prism.FFmpeg({
            args: [
              '-analyzeduration', '0',
              '-loglevel', '0',
              '-f', 's16le',
              '-ar', '48000',
              '-ac', '2',
            ]
          })
          let resource = createAudioResource(stream.pipe(transcoder), { inputType: StreamType.Raw});
          audioPlayer.play(resource);
          interaction.reply(`tocando: ${(await ytdl.getInfo(queueMusics[0])).videoDetails.title} `);
        }
      else{
        let resorce = createAudioResource(queueMusics[0]);
        audioPlayer.play(resorce);
      }
      // actualPlayer = audioPlayer;

      audioPlayer.on(AudioPlayerStatus.Idle , async(old, newState) => {
        try {
          await entersState(audioPlayer, AudioPlayerStatus.Playing, 100.0)

        } catch (error) {
          voiceEmitter.emit('skip' , interaction)
        }
       
      })
      
    }
    else {
      const channel = client.channels.cache.get(interaction.channelId)
      channel.send("Não há nenhuma musica na fila")

    }

  } catch (error) {
    console.log(error)
  }
}

voiceEmitter.on('beginPlay', (interaction) => {
  playMusic(interaction)
})

module.exports = {playMusic, voiceEmitter}