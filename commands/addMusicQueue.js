const { queueMusics } = require("../Server");

require("../Server.js");

const addEvent = require("../services/eventCommandHandle")

const checkIfIsYoutubeDomain = (url) => {
    try {
        const domain = new URL(url);
        if(domain.host === "youtu.be" || domain.hostname === "www.youtube.com" || domain.hostname === domain.hostname === "m.youtube.com") return true;
        return false;

    } catch (error) {
        console.error("Não foi possivel transformar esse link em URL")
        return false
    }
    
    
}

module.exports = {
    name: "!play",
    help:"Dado um url do youtube, adiciona essa musica a fila",
    async execute(interaction){
        if(interaction.member.voice.channelId === null) return interaction.reply("Entre em um canal de voz primeiro");
        let menssageStriped = interaction.content.split(" ");
        if(menssageStriped[1] == undefined) return interaction.reply("Voce deve oferecer um link do youtube valido após o add");
        if(checkIfIsYoutubeDomain(menssageStriped[1])){
            if(queueMusics.length === 0){
            queueMusics.push(menssageStriped[1]);
            addEvent.emit('AddedToQueueEmpty', interaction);
            return;
            }
            else if(queueMusics.length !== 0){
                queueMusics.push(menssageStriped[1]);
                addEvent.emit('AddedToQueue');
            }
        } 
        else {
            return interaction.reply("O link deve ser do youtube!")
        };
    }, addEvent
};