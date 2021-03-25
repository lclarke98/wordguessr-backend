//csv reader
const reader = require("csv-parse")
// needs to get the chosen game to find a word
const db = require('./game-db')
const csv = require('csv-parser');
const fs = require('fs');




async function getWord(gameMode){
    if (gameMode === 'normal'){
       let word = await db.getWord(Math.floor(Math.random() * Math.floor(500)))
        return word
        //console.log(word)
   }
    return ''
}

function test(){
    let list = []
    fs.createReadStream('/Users/leoclarke/Documents/github/wordguessr-backend/game/words.csv')
        .pipe(csv())
        .on('data', (data) => list.push(data))
        .on('end', () => {
            //console.log(list);
            // [
            //   { NAME: 'Daffy Duck', AGE: '24' },
            //   { NAME: 'Bugs Bunny', AGE: '22' }
            // ]
        });
    return list
}

async function getWordList(path){
    let list = []
    fs.createReadStream('/Users/leoclarke/Documents/github/wordguessr-backend/game/words.csv')
        .pipe(csv())
        .on('data', (row) => {
            list.push(row.word)
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });

    return list
}


module.exports = {
    getWord,

}