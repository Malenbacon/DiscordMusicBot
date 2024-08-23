module.exports = {
    name: "!list",
    help:"",
    async execute(interaction){
        await interaction.reply(`To vivasso ${interaction.user.username}`);
    }
};