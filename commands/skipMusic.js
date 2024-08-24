const skipEvent = require("../services/eventCommandHandle")

module.exports = {
    name: "!skip",
    help:"Pula a musica atual",
    async execute(interaction){
        skipEvent.emit("skip")
        await interaction.reply(`Pulei! `);
    }
};