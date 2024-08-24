module.exports = {
    name: "!list",
    help:"Lista a fila de musicas a tocar atual",
    async execute(interaction){
        await interaction.reply(`To vivasso ${interaction.user.username}`);
    }
};