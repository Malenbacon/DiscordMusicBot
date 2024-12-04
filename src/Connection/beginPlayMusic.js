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
      let audioPlayer = createAudioPlayer();
      stopped = false;
      const connection = getVoiceConnection(interaction.guildId);
      connection.subscribe(audioPlayer);
      if(checkIfIsYoutubeDomain(queueMusics[0])){
          let stream =  await ytdl(queueMusics[0], { filter: 'audioonly', quality:'highestaudio', dlChunkSize: 1024*1024*10});
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
          voiceEmitter.emit('quitInativo' , interaction)
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
  console.log(actualPlayer);
  stopped = true;
  playMusic(interaction)
  voiceEmitter.emit("quitClear", interaction)
})
voiceEmitter.on('quitClear', (interaction) => {
  const voiceConnection = getVoiceConnection(interaction.guildId);
  const channel = client.channels.cache.get(interaction.channelId)
  voiceConnection.destroy(); 
  channel.send(`Adicione alguma outra musica com !play`);
})


voiceEmitter.on("quit", async(interaction)=> {
  const voiceConnection = getVoiceConnection(interaction.guildId);
  const channel = client.channels.cache.get(interaction.channelId)
  voiceConnection.destroy(); 
  while(queueMusics.length > 0){
    queueMusics.pop();
  }
  channel.send(`Saindo...`);
})
voiceEmitter.on("quitInativo", async(interaction)=> {
  const voiceConnection = getVoiceConnection(interaction.guildId);
  const channel = client.channels.cache.get(interaction.channelId)
  voiceConnection.destroy(); 
  while(queueMusics.length > 0){
    queueMusics.pop();
  }
  channel.send(`Saindo devido a inatividade...`);
})

module.exports = {playMusic, voiceEmitter}
