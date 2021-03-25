// handle game session
const db = require('./game-db')

const ws = require('./wordSelector')

/**
 * @param userSub
 * @param gameMode
 * @returns {Promise<{gameID: number, userSub: *}>}
 */
async function createGame(userSub, gameMode){
    //let word = await ws.getWord(gameMode)
    let word = await ws.getWord(gameMode)
    let gameID = await db.createGame(userSub,gameMode, word[0].word)
    return {'userSub': userSub, 'gameID': gameID}
}

async  function toJSON(obj){
    let arr = obj[0].guesses.replace("'", "");
    let newArr = JSON.parse(arr)
    return newArr
}

/**
 * @param gameID
 * @returns {Promise<*>}
 */
async function getGame(gameID){
    let game = await db.getGame(gameID)
    let arr = await toJSON(game)
    game.push(arr)
    let complete = await isGameComplete(arr, game[0].word)
    if (complete === true){
        game.push({'complete': true})
    }else {
        game.push({'complete': false})
    }
    return game
}

/**
 * @param gameID
 * @param guess
 * @returns {Promise<void>}
 */
async function makeGuess(gameID, guess){
// {'guess':"", 'correct': true/false}
    let game = await getGame(gameID)
    let arr = game[0].guesses.replace("'", "");
    let newArr = JSON.parse(arr)

    let strToCheck = RegExp(guess, 'g')
    let matchesReg = game[0].word.matchAll(strToCheck)
    let count = Array.from(matchesReg).length

    if (game[0].word.includes(guess)){
        for (let i = 0; i < count; i++ ){
            newArr.push({'guess':guess, 'correct': true})
        }
    }else{
        newArr.push({'guess':guess, 'correct': false})
    }
    await db.addGuess(gameID, newArr)

    return getGame(gameID)
}

async function isGameComplete(list, word){
    let count = 0
    let wordCount = word.length
    for (let i = 0; i < list.length; i++){
        if (list[i].correct === true){
            count += 1
        }
    }
    return count === wordCount;
}

/**
 * @param gameID
 * @param guess
 * @returns {Promise<void>}
 */
async function guessWord(gameID, guess){
// {'guess':"", 'correct': true/false}
}


module.exports = {
    createGame,
    getGame,
    makeGuess,
    guessWord,
    isGameComplete,
}