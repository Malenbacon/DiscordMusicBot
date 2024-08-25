const removeEvent =  require('../src/Handlers/eventCommandHandle.js')
const {queueMusics} = require("../Server.js")

module.exports = {
    name: "!remove",
    help:"Remove uma musica da fila dada certa posicao",
    async execute(interaction){
        await interaction.reply(`To vivasso ${interaction.user.username}`);
    }
};