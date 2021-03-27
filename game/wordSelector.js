//csv reader
const reader = require("csv-parse")
// needs to get the chosen game to find a word
const db = require('./game-db')
//const csv = require('csv-parser');
const fs = require('fs');
const csv = require('csvtojson');



async function getWord(gameMode){
    if (gameMode === 'normal'){
       let word = await getWordList('/Users/leoclarke/Documents/github/wordguessr-backend/game/words.csv')
        return word[Math.floor(Math.random() * Math.floor(500))].word
   }
    return ''
}

async function getWordList(csvFilePath){
    const csv = require('csvtojson');
    const jsonObj = await csv().fromFile(csvFilePath)
    return jsonObj

}


module.exports = {
    getWord,

}