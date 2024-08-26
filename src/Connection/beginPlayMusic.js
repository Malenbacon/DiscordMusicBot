const {getVoiceConnection, createAudioPlayer, createAudioResource, AudioPlayerStatus} = require('@discordjs/voice')
const {queueMusics, client} = require('../../Server.js')
const voiceEmitter = require("../Handlers/voiceConnectionEventHandler.js")

const playMusic = (interaction) => {
  try {
    if(queueMusics.length !== 0){
      const audioPlayer = createAudioPlayer();
      const connection = getVoiceConnection(interaction.guildId);
      connection.subscribe(audioPlayer);
      let resorce =  createAudioResource(queueMusics[0].url);
      audioPlayer.play(resorce);

      audioPlayer.on(AudioPlayerStatus.Idle , (old, newState) => {
        console.log("acabou a musica")
        voiceEmitter.emit('skip', interaction)
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
      console.log(interaction)
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