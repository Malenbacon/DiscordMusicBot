const commandMap  = require("./grabAllCommands.js");

async function commandHandler(mensage)
{
    let allCommands = commandMap();
    if(mensage.channel.id != "794774527744671764") return;  
    let mensageStriped = mensage.content.split(" ")
    if(mensageStriped[1] === undefined) {
        
    }

}

module.exports = commandHandler;

