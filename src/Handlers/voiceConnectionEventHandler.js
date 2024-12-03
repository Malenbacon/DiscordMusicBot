const EventEmitter = require('node:events');
const {queueMusics, stackHistoryMusic} = require('../../Server.js');

const voiceEvents = new EventEmitter();

voiceEvents.on("skip", async(interaction) => {
    stackHistoryMusic.push(queueMusics.shift());
    voiceEvents.emit("beginPlay", interaction)
});

voiceEvents.on('back', async(interaction) => {
    queueMusics.unshift(stackHistoryMusic.pop());
    voiceEvents.emit("beginPlay", interaction)
})

voiceEvents.on('clear', async(interaction) => {
    while(queueMusics.length > 0){
        queueMusics.pop();
    }
    voiceEvents.emit("beginPlayClear", interaction)
})

voiceEvents.on("remove", async(interaction)=>{
    let mensagem = interaction.content.split(" ");
    let position = Number(mensagem[1]);
    if(position == NaN) return interaction.reply("De um valor numerico da posição da musica na fila, caso precise use o !list");
    if(position > queueMusics.length || position <= 0) return interaction.reply("De um valor numerico da posição da musica na fila, caso precise use o !list");
    if(position === 1) voiceEvents.emit('skip');
    else if(position !== 1){
        queueMusics.splice(position-1,1);
        return interaction.reply("Removido!");
    }
})


// other listeners are in Connection/beginPlayMusic

module.exports = voiceEvents;