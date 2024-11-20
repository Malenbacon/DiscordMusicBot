const { queueMusics } = require("../Server");
const addEvent = require("../src/Handlers/eventCommandHandle.js")
const checkIfIsYoutubeDomain = require("../services/checkIfIsYoutubeDomain.js")

module.exports = {
    name: "!play",
    help:"Dado um url do youtube, adiciona essa musica a fila",
    async execute(interaction){
        if(interaction.member.voice.channelId === null) return interaction.reply("Entre em um canal de voz primeiro");
        const [attachments] = interaction.attachments.values();
        
        if(attachments === undefined){
            let mensagem = interaction.content.split(" ");
            if(mensagem[1] == undefined) return interaction.reply("Voce deve oferecer um link do youtube valido após o add");
            if(checkIfIsYoutubeDomain(mensagem[1])){
                if(queueMusics.length === 0){
                queueMusics.push(mensagem[1]);
                addEvent.emit('AddedToQueueEmpty', interaction);
                return;
                }
                else if(queueMusics.length !== 0){
                    queueMusics.push(mensagem[1]);
                    addEvent.emit('AddedToQueue', interaction);
                }
            } 
            else {
                return interaction.reply("O link deve ser do youtube!")
            };

        }
        else if(attachments != undefined && attachments.url){
            if(queueMusics.length === 0){
                queueMusics.push(attachments.url);
                addEvent.emit('AddedToQueueEmpty', interaction);
                return;
            }
            else if(queueMusics.length !== 0){
                queueMusics.push(attachments.url)
                addEvent.emit('AddedToQueue', interaction);
                return;
            }
        }
    }
};