// handle game session
const db = require('./game-db')
const ws = require('./wordSelector')


async function createGame(userSub, gameMode){
    //let word = await ws.getWord(gameMode)
    let index = 2
    let word = await db.getWord(index)
    let gameID = await db.createGame(userSub,gameMode, word[0].word)
    let rtnObject = {'userSub':userSub, 'gameID':gameID}
    return rtnObject
}

async function getGame(gameID){
    let game = await db.getGame(gameID)
    return game
}

async function makeGuess(gameID, guess){
// {'guess':"", 'correct': true/false}
}

//make turn
//validate turn
//

//make guess


module.exports = {
    createGame,
    getGame,
    makeGuess,
}