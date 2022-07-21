// handle game session
const db = require('./game-db')
const ws = require('./wordSelector')

/**
 * @param userSub
 * @param gameMode
 * @returns {Promise<{gameID: number, userSub: *}>}
 */
async function createGame(userSub:string, gameMode:string){
    let word = await ws.getWord(gameMode)
    let count = await calculateGuessCount(word, gameMode)
    let gameID = await db.createGame(userSub,gameMode, word, count)
    return {'userSub': userSub, 'gameID': gameID}
}

/**
 * @param obj
 * @returns {Promise<any>}
 */
async  function toJSON(obj:any){

    let arr = obj[0].guesses.replace("'", "");

    console.log(obj)
    return JSON.parse(arr)
}

/**
 * @param gameID
 * @param userID
 * @returns {Promise<*>}
 */
async function getGame(gameID:string, userID:string){
    let game = await db.getGame(gameID, userID)
    console.log(game)
    //let arr = await toJSON(game)
    let arr = game[0]
    game.push(arr.guesses)
    let complete = await isGameComplete(game[0].guesses, game[0].word)
    if (complete === true){
        await db.setComplete(gameID)
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
async function makeGuess(gameID:string, guess:string, guessCount:number, userID:string){
// {'guess':"", 'correct': true/false}
    let game = await getGame(gameID,userID)
    //let arr = game[0].guesses.replace("'", "");
    //let newArr = JSON.parse(arr)
    let newArr = game[0].guesses

    let strToCheck = RegExp(guess, 'g')
    let matchesReg = game[0].word.matchAll(strToCheck)
    let count = Array.from(matchesReg).length

    console.log('game: ', game[0].word)

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
async function isGameComplete(list:any, word:string){
    let count = 0
    let wordCount = word.length
    console.log('-------')
    console.log(wordCount)
    console.log(list)
    console.log('-------')
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
async function calculateGuessCount(word:string, gameMode:string){
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
async function guessWord(gameID:number, word:string, guessedWord:string){
// {'guess':"", 'correct': true/false}
    return word === guessedWord;
}

//userID: this.userInfo.sub,

export {
    createGame,
    getGame,
    makeGuess,
    guessWord,
    isGameComplete,
    toJSON,
    calculateGuessCount,
}