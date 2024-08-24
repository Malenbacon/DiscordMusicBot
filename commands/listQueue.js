const ytdl = require("ytdl-core")
const {queueMusics} = require("../Server.js")

module.exports = {
    name: "!list",
    help:"Lista a fila de musicas a tocar atual",
    async execute(interaction){
    
        if(queueMusics.length === 0) return interaction.reply("Nao há nenhuma musica na fila nesse momento")
        let queueMusicNamesStringBuilder = ''
        if(queueMusics.length < 5){
            for(let i = 0; i<=queueMusics.length; i++){
                let videoInfo = (await ytdl.getInfo(queueMusics[i])).videoDetails;
                queueMusicNamesStringBuilder += `${videoInfo.title} - ${videoInfo.lengthSeconds}s \n `
            }
        }
        if(queueMusics.length >= 5){
            for(let i = 0; i<5; i++){
                let videoInfo = (await ytdl.getInfo(queueMusics[i])).videoDetails;
                queueMusicNamesStringBuilder += `${videoInfo.title} - ${videoInfo.lengthSeconds}s \n`
            }
            
        }
    }
};