const {eventEmiiter} = require("node:events");
const stopEvent = new eventEmiiter();

module.exports = {
    name: "!stop",
    help:"Pausa a musica atual",
    async execute(interaction){
        stopEvent.emit("stop");
        await interaction.reply(`Pararão a musica atual`);
    }
};