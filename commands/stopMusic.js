module.exports = {
    name: "!stop",
    help:"Pausa a musica atual",
    async execute(interaction){
        await interaction.reply(`Pararão a musica atual`);
    }
};