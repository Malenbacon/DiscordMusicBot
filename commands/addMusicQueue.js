const { queueMusics } = require("../Server");
const addEvent = require("../src/Handlers/eventCommandHandle.js")
const checkIfIsYoutubeDomain = require("../services/checkIfIsYoutubeDomain.js")

module.exports = {
    name: "!play",
    help:"Dado um url do youtube, adiciona essa musica a fila",
    async execute(interaction){
        const [attachments] = interaction.attachments.values();
        if(!attachments.url){
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
                    addEvent.emit('AddedToQueue', interaction);
                }
            } 
            else {
                return interaction.reply("O link deve ser do youtube!")
            };
        }
        if(attachments.url){
            if(interaction.member.voice.channelId === null) return interaction.reply("Entre em um canal de voz primeiro");
            
            if(queueMusics.length === 0){
                queueMusics.push(attachments);
                addEvent.emit('AddedToQueueEmpty', interaction);
                return;
            }
            else if(queueMusics.length !== 0){
                queueMusics.push(attachments)
                addEvent.emit('AddedToQueue', interaction);
                return;
            }
        }
    }
};