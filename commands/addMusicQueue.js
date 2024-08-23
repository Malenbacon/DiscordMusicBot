import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder().setName('add').setDescription("Adiciona a musica na fila"),
    async execute(interaction){
        
    }
};