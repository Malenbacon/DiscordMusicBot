const {eventEmiiter} = require("node:events");
module.exports = {
    name: "!rm",
    help:"Remove uma musica da fila dada certa posicao",
    async execute(interaction){
        await interaction.reply(`To vivasso ${interaction.user.username}`);
    }
};