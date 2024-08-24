const {EventEmitter} = require("node:events");
const removeEvent = new EventEmitter;
module.exports = {
    name: "!rm",
    help:"Remove uma musica da fila dada certa posicao",
    async execute(interaction){
        await interaction.reply(`To vivasso ${interaction.user.username}`);
    }
};