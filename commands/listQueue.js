const {queueMusics} = require("../Server.js")
const checkIfIsYoutubeDomain = require("../services/checkIfIsYoutubeDomain.js")
const ytdl = require('@distube/ytdl-core')

module.exports = {
    name: "!list",
    help:"Lista a fila de musicas a tocar atual",
    async execute(interaction){
    
        if(queueMusics.length === 0) return interaction.reply("Nao há nenhuma musica na fila nesse momento")
        let queueMusicNamesStringBuilder = ''
            for(let i = 0; i < 10 ; i++){
                if(i >= queueMusics.length) {
                    break;
                };
                if(!checkIfIsYoutubeDomain(queueMusics[i])) {queueMusicNamesStringBuilder += `${i+1} - Musica adicionada por envio (sem info) \n `; continue;}
                let videoInfo = (await ytdl.getBasicInfo(queueMusics[i])).videoDetails;
                let tempoSeg = videoInfo.lengthSeconds
                let tempoMin = Math.floor(tempoSeg / 60); tempoSeg %= 60;
                queueMusicNamesStringBuilder += `${i+1} - ${videoInfo.title} - *${tempoMin}m ${tempoSeg}s* \n`

            }
            if(queueMusics.length >= 10){
                queueMusicNamesStringBuilder += '...'
            }
        interaction.reply(queueMusicNamesStringBuilder);
    }
};