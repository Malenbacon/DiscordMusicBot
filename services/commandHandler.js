const commandMap  = require("./grabAllCommands.js");

async function commandHandler(mensage)
{
    if(mensage.channel.id != "794774527744671764") return; 
    if(mensage.author.bot) return;
    let allCommands = commandMap();
    let mensageStriped = mensage.content.split(" ")
    if(!allCommands.has(mensageStriped[0])) return;
    let functionToCall = allCommands.get(mensageStriped[0])
    functionToCall.execute(mensage);

}

module.exports = commandHandler;

