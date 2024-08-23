module.exports = {
    name: "!test",
    help:"",
    async execute(interaction){
        await interaction.reply(`To vivasso ${interaction.user.username}`);
     }
};