const stopEvent = require("../services/eventCommandHandle")

module.exports = {
    name: "!stop",
    help:"Pausa a musica atual",
    async execute(interaction){
        stopEvent.emit("stop");
        await interaction.reply(`Pararão a musica atual`);
    }
};