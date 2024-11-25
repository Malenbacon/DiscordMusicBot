const commandMap  = require("../../services/grabAllCommands.js");

async function commandHandler(mensage)
{
    if(mensage.author.bot) return;
    let allCommands = commandMap();
    let mensageStriped = mensage.content.split(" ")
    if(!allCommands.has(mensageStriped[0])) return;
    if(mensage.channelId != '794774527744671764') return mensage.reply("Mande musicas no chat https://discord.com/channels/784862148496064512/794774527744671764");
    let functionToCall = allCommands.get(mensageStriped[0])
    functionToCall.execute(mensage);

}

module.exports = commandHandler;

