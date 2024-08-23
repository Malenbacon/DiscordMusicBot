import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder().setName('removeFromQueue').setDescription("Digite uma posiçao para remover da fila de musicas"),
    async execute(interaction){
        await interaction.reply(`To vivasso ${interaction.user.username}`);
    }
};