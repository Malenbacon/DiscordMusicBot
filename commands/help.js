let grabAllCommands = require("../services/grabAllCommands")
module.exports = {
    name: "!help",
    help:"apresenta todos os comandos",
    async execute(interaction){
        let allCommands = grabAllCommands();
        let commandsStringBuilder = '';
        for(command of allCommands){
            commandsStringBuilder += `${command[1].name} - ${command[1].help} \n`
        }
        return interaction.reply(commandsStringBuilder);
        
    }
};