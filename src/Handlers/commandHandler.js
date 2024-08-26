const commandMap  = require("../../services/grabAllCommands.js");

async function commandHandler(mensage)
{
    if(mensage.author.bot) return;
    let allCommands = commandMap();
    let mensageStriped = mensage.content.split(" ")
    if(!allCommands.has(mensageStriped[0])) return;
    let functionToCall = allCommands.get(mensageStriped[0])
    functionToCall.execute(mensage);

}

module.exports = commandHandler;

