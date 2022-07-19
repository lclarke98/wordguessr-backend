const mysql = require('mysql2/promise')
const config = require('../db-config')
const connection = mysql.createConnection(config.mysql)


async function createGame(userSub:string,gameMode:string, word:string, count:number)  {
    let con = await connection
    let sql = "INSERT INTO game (user_sub, game_mode,word, guess_count, guesses) values (?,?,?,?, '[]')"
    const insert = await con.query(sql, [userSub, gameMode, word, count]);
    return insert[0].insertId
}

async function getWord(index:string)  {
    let con = await connection
    let [word] = await con.query("SELECT * FROM words WHERE id = ?",[index])
    return word
}

async function getGame(gameID:number, userID:string){
    let con = await connection
    let [game] = await con.query("SELECT * FROM game WHERE game_id = ? AND user_sub = ?",[gameID, userID])
    return game
}

async function getAllGames(userID:number){
    let con = await connection
    let [games] = await con.query("SELECT * FROM game WHERE user_sub = ?", [userID])
    return games
}

async function addGuess(gameID:number, guess:string, count:number){
    let con = await connection
    let sql = "UPDATE game SET guesses = ?, guess_count=? WHERE game_id = ?"
    await con.query(sql, [JSON.stringify(guess), count, gameID]);
    return true
}

export {
    createGame,
    getWord,
    getAllGames,
    getGame,
    addGuess,
}