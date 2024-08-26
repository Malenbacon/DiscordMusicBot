const {getVoiceConnection, createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState} = require('@discordjs/voice')
let {queueMusics, client} = require('../../Server.js')
const voiceEmitter = require("../Handlers/voiceConnectionEventHandler.js")
let actualPlayer;
let paused = false;

const playMusic = (interaction) => {
  try {
    if(queueMusics.length !== 0){
      const audioPlayer = createAudioPlayer();
      const connection = getVoiceConnection(interaction.guildId);
      connection.subscribe(audioPlayer);
      let resorce =  createAudioResource(queueMusics[0].url);
      audioPlayer.play(resorce);
      actualPlayer = audioPlayer;

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
      
      
      interaction.reply(`tocando: ${queueMusics[0].name} `)
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