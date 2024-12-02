const {getVoiceConnection, createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState, StreamType} = require('@discordjs/voice')
let {queueMusics, client} = require('../../Server.js')
const voiceEmitter = require("../Handlers/voiceConnectionEventHandler.js")
const checkIfIsYoutubeDomain = require("../../services/checkIfIsYoutubeDomain.js");
const ytdl = require("@distube/ytdl-core");
let paused = false;
let stopped = false;

const playMusic = async (interaction) => {
  const channel = client.channels.cache.get(interaction.channelId)
  try {
    if(queueMusics.length !== 0){
      stopped = false;
      const audioPlayer = createAudioPlayer();
      const connection = getVoiceConnection(interaction.guildId);
      connection.subscribe(audioPlayer);
      if(checkIfIsYoutubeDomain(queueMusics[0])){
          let stream =  await ytdl(queueMusics[0], { filter: 'audioonly', quality:'highestaudio', dlChunkSize: 1024*1024*50});
          let resource = createAudioResource(stream, { inputType: StreamType.Arbitrary});
          audioPlayer.play(resource);
          channel.send(`tocando: ${(await ytdl.getBasicInfo(queueMusics[0])).videoDetails.title} `);
        }
      else{
        let resorce = createAudioResource(queueMusics[0]);
        audioPlayer.play(resorce);
      }
      actualPlayer = audioPlayer;

      audioPlayer.on(AudioPlayerStatus.Idle , async(old, newState) => {
        try {
          if(!stopped) await entersState(audioPlayer, AudioPlayerStatus.Buffering, 50.0);

        } catch (error) {
          voiceEmitter.emit('skip' , interaction)
        }
       
      })
      audioPlayer.on(AudioPlayerStatus.Idle , async(old, newState) => {
        try {
          await entersState(audioPlayer, AudioPlayerStatus.Playing, 900000);

        } catch (error) {
          voiceEmitter.emit('quit' , interaction)
        }
       
      })
      
    }
    else {
      channel.send("Não há nenhuma musica na fila")
      const connection = getVoiceConnection(interaction.guildId);
      connection.dispatchAudio();
    }

  } catch (error) {
    console.log(error)
    voiceEmitter.emit('skip' , interaction)
  }
}

voiceEmitter.on('beginPlay', (interaction) => {
  playMusic(interaction)
})

voiceEmitter.on('pause', (interaction) => {
  if(!paused) {
    actualPlayer.pause();
    paused = true;
  }
  else {
    actualPlayer.unpause();
    paused = false;
  }
})

voiceEmitter.on('beginPlayClear', (interaction) => {
  actualPlayer.stop();
  stopped = true;
  playMusic(interaction)
})

voiceEvents.on("quit", async(interaction)=> {
  voiceConnection.destroy(); 
  while(queueMusics.length > 0){
    queueMusics.pop();
  }
  channel.send(`Saindo...`);
})

module.exports = {playMusic, voiceEmitter}
