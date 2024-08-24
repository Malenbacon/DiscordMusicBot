const { queueMusics } = require("../Server");
const {eventEmiiter} = require("node:events");
require("../Server.js");

const addEvent = new eventEmiiter();
const checkIfIsYoutubeDomain = (url) => {
    const domain = new URL(url);
    console.log(domain.hostname);
    if(domain.host === "youtu.be" || domain.hostname === "www.youtube.com" || domain.hostname === domain.hostname === "m.youtube.com") return true;
    return false;
}

module.exports = {
    name: "!add",
    help:"Dado um url do youtube, adiciona essa musica a fila",
    async execute(interaction){
        let menssageStriped = interaction.content.split(" ");
        if(menssageStriped[1] == undefined) return interaction.reply("Voce deve oferecer um link do youtube apos o add");
        if(checkIfIsYoutubeDomain(menssageStriped[1])){
            queueMusics.push(menssageStriped[1]);
            addEvent.emit('AddedToQueue');
            return;
        } 
        else {
            return interaction.reply("O link deve ser do youtube!")
        };
    }
};