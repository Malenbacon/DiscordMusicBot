module.exports = {
    name: "!teste",
    help:"Comando para testar se o bot ta responsivo",
    async execute(interaction){
        await interaction.reply(`To vivasso ${interaction.author.username}`);
     }
};