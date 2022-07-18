// handle game session
const db = require('./game-db')
const ws = require('./wordSelector')

/**
 * @param userSub
 * @param gameMode
 * @returns {Promise<{gameID: number, userSub: *}>}
 */
async function createGame(userSub, gameMode){
    let word = await ws.getWord(gameMode)
    let count = await calculateGuessCount(word, gameMode)
    let gameID = await db.createGame(userSub,gameMode, word, count)
    return {'userSub': userSub, 'gameID': gameID}
}

/**
 * @param obj
 * @returns {Promise<any>}
 */
async  function toJSON(obj){
    let arr = obj[0].guesses.replace("'", "");
    return JSON.parse(arr)
}

/**
 * @param gameID
 * @param userID
 * @returns {Promise<*>}
 */
async function getGame(gameID, userID){
    let game = await db.getGame(gameID, userID)
    console.log(game)
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
 * @param guessCount
 * @param userID
 * @returns {Promise<void>}
 */
async function makeGuess(gameID, guess, guessCount, userID){
// {'guess':"", 'correct': true/false}
    let game = await getGame(gameID,userID)
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
    await db.addGuess(gameID, newArr, guessCount)
    return getGame(gameID, userID)
}

/**
 * @param list
 * @param word
 * @returns {Promise<boolean>}
 */
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
 * @param word
 * @param gameMode
 * @returns {Promise<number>}
 */
async function calculateGuessCount(word, gameMode){
    let wordLength = word.length
    let guessCount = 0

    switch (gameMode === 'normal'){
        case wordLength <= 4:
            guessCount = 8
            break
        case wordLength <= 9:
            guessCount = 12
            break
        case wordLength >=10:
            guessCount = 16
            break
    }
    return guessCount
}

/**
 * @param gameID
 * @param word
 * @param guessedWord
 * @returns {Promise<boolean>}
 */
async function guessWord(gameID, word, guessedWord){
// {'guess':"", 'correct': true/false}
    return word === guessedWord;
}

//userID: this.userInfo.sub,

module.exports = {
    createGame,
    getGame,
    makeGuess,
    guessWord,
    isGameComplete,
    toJSON,
    calculateGuessCount,
}