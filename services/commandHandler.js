const commandMap  = require("./grabAllCommands.js");

async function commandHandler(mensage)
{
    let allCommands = commandMap();
    if(mensage.channel.id != "794774527744671764") return; 
    let mensageStriped = mensage.content.split(" ")
    if(!allCommands.has(mensageStriped[0])) return;
    let functionToCall = allCommands.get(mensageStriped[0])
    functionToCall.execute(mensage);

}

module.exports = commandHandler;

