const fs = require('fs')
const path = require('path')

function commandMap(){
    let allCommands = new Map();
    let __dirname = path.resolve();
    let folderCommand = path.join(__dirname, 'commands');
    let commandFiles = fs.readdirSync(folderCommand)
    for(const file of commandFiles){
        const pathFile = path.join(folderCommand, file);
        const files = require(pathFile);
        allCommands.set(files.name, files)
        
    }
    return allCommands;

}
module.exports = commandMap;