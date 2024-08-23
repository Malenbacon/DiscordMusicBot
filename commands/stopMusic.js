import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder().setName('stop').setDescription("Pausa a musica atual"),
    async execute(interaction){
        await interaction.reply(`Pararão a musica atual`);
    }
};