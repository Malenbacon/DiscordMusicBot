const { queueMusics } = require("../Server");
const addEvent = require("../src/Handlers/eventCommandHandle.js")
const checkIfIsYoutubeDomain = require("../services/checkIfIsYoutubeDomain.js")
const ytpl = require('@distube/ytpl')

module.exports = {
    name: "!play",
    help:"Dado um url do youtube, adiciona essa musica a fila",
    async execute(interaction){
        if(interaction.member.voice.channelId === null) return interaction.reply("Entre em um canal de voz primeiro");
        const [attachments] = interaction.attachments.values();
        
        if(attachments === undefined){
            let mensagem = interaction.content.split(" ");
            if(mensagem[1] == undefined) return interaction.reply("Voce deve oferecer um link do youtube valido após o play");
            if(checkIfIsYoutubeDomain(mensagem[1])){
                if(ytpl.validateID(mensagem[1])){
                    let url = new URLSearchParams(mensagem[1])
                    let response  = await ytpl(mensagem[1], {limit:50})
                    for(let videoInfo of response.items){
                        queueMusics.push(videoInfo.url)
                    }
                    if(url.has("index")){
                        for(let i = 0; i< url.get("index") - 1;i++){
                            queueMusics.shift();
                        }
                    }
                }
                else{

                    queueMusics.push(mensagem[1])     
                }
                addEvent.emit('AddedToQueue', interaction);
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