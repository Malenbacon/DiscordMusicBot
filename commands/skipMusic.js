const {EventEmitter} = require("node:events");
const skipEvent = new EventEmitter();

module.exports = {
    name: "!skip",
    help:"Pula a musica atual",
    async execute(interaction){
        skipEvent.emit("skip")
        await interaction.reply(`Pulei! `);
    }
};