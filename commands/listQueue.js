const ytdl = require("ytdl-core")
const {queueMusics} = require("../Server.js")

module.exports = {
    name: "!list",
    help:"Lista a fila de musicas a tocar atual",
    async execute(interaction){
        let queueMusicNamesStringBuilder = ''
        if(queueMusics.length < 5){
            for(let i = 0; i<queueMusics.length; i++){
                let name = await ytdl.getInfo()
                console.log(name);
            }
        }
        await interaction.reply(`To vivasso ${interaction.user.username}`);
    }
};