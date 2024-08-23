import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder().setName('list').setDescription("lista todas as musicas na fila"),
    async execute(interaction){
        await interaction.reply(`To vivasso ${interaction.user.username}`);
    }
};