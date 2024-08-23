import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder().setName('Teste').setDescription("teste pra ver se o bot responde"),
    async execute(interaction){
        await interaction.reply(`To vivasso ${interaction.user.username}`);
    }
};