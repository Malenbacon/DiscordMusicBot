import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder().setName('skip').setDescription("Pula a musica tocando atualmente"),
    async execute(interaction){
        await interaction.reply(`Pulei! `);
    }
};