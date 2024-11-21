const {getVoiceConnection, createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState, StreamType} = require('@discordjs/voice')
let {queueMusics, client} = require('../../Server.js')
const voiceEmitter = require("../Handlers/voiceConnectionEventHandler.js")
const checkIfIsYoutubeDomain = require("../../services/checkIfIsYoutubeDomain.js");
const ytdl = require("@distube/ytdl-core");
const prism = require("prism-media");

let actualPlayer;

const playMusic = async (interaction) => {
  try {
    if(queueMusics.length !== 0){
      const audioPlayer = createAudioPlayer();
      const connection = getVoiceConnection(interaction.guildId);
      connection.subscribe(audioPlayer);
      if(checkIfIsYoutubeDomain(queueMusics[0])){
        let stream =  ytdl(queueMusics[0], { filter: 'audioonly'});
        let resource = createAudioResource(stream, { inputType: StreamType.WebmOpus});
        audioPlayer.play(resource);
        interaction.reply(`tocando: ${(await ytdl.getInfo(queueMusics[0])).videoDetails.title} `)
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

      // voiceEmitter.on('pause', (interaction) => {
      //   audioPlayer.pause();
      // })

      // voiceEmitter.on('resume', (interaction) => {
      //   audioPlayer.pause();
      // })
      
      
      
    }
    else {
      const channel = client.channels.cache.get(interaction.channelId)
      channel.send("Não há nenhuma musica na fila")

    }

  } catch (error) {
    console.log(error)
  }
}

voiceEmitter.on('clear', () => {
  queueMusics = [];
  actualPlayer.stop();
})

voiceEmitter.on('pause', () => {
  if(!paused) {actualPlayer.pause(); paused = true}
  else if(paused) {actualPlayer.unpause(); paused = false}
 
})

voiceEmitter.on('beginPlay', (interaction) => {
  playMusic(interaction)
})

module.exports = {playMusic, voiceEmitter}