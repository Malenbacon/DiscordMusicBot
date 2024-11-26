const {queueMusics} = require("../Server.js")
const checkIfIsYoutubeDomain = require("../services/checkIfIsYoutubeDomain.js")
const ytdl = require('@distube/ytdl-core')

module.exports = {
    name: "!list",
    help:"Lista a fila de musicas a tocar atual",
    async execute(interaction){
    
        if(queueMusics.length === 0) return interaction.reply("Nao há nenhuma musica na fila nesse momento")
        let queueMusicNamesStringBuilder = ''
        if(queueMusics.length < 5){
            for(let i = 0; i<queueMusics.length; i++){
                if(checkIfIsYoutubeDomain(queueMusics[i]))
                { 
                    let videoInfo = (await ytdl.getBasicInfo(queueMusics[i])).videoDetails;
                    queueMusicNamesStringBuilder += `${videoInfo.title} - ${videoInfo.lengthSeconds}s \n `
                }
                else 
                {
                    console.log(queueMusics[i])
                    queueMusicNamesStringBuilder += `Musica adicionada por envio (sem info) \n `
                }

            }
        }
        if(queueMusics.length >= 5){
            for(let i = 0; i<5; i++){
                let videoInfo = (await ytdl.getInfo(queueMusics[i])).videoDetails;
                queueMusicNamesStringBuilder += `${videoInfo.title} - ${videoInfo.lengthSeconds}s \n`
            }
            
        }
        interaction.reply(queueMusicNamesStringBuilder);
    }
};