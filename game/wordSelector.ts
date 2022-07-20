//csv reader
const reader = require("csv-parse")
// needs to get the chosen game to find a word
import * as db from './game-db'
//const csv = require('csv-parser');
const fs = require('fs');
const csv = require('csvtojson');



async function getWord(gameMode:string){
    if (gameMode === 'normal'){
        console.log('path: ', process.env.CSV_PATH + 'words.csv')
        let word = await getWordList('/Users/leo/Documents/git/wordguessr-backend/game/' + 'words.csv')
        return word[Math.floor(Math.random() * Math.floor(500))].word
    }
    return ''
}

async function getWordList(csvFilePath:string){
    const csv = require('csvtojson');
    const jsonObj = await csv().fromFile(csvFilePath)
    return jsonObj

}


module.exports = {
    getWord,

}