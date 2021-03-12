const mysql = require('mysql2/promise')
const config = require('../db-config')
const connection = mysql.createConnection(config.mysql)


async function createGame(userSub,gameMode, word)  {
    let con = await connection
    let sql = "INSERT INTO game (user_sub, game_mode,word) values (?,?,?)"
    const insert = await con.query(sql, [userSub, gameMode, word]);
    return insert[0].insertId
}

async function getWord(index)  {
    let con = await connection
    let [word] = await con.query("SELECT * FROM words WHERE id = ?",[index])
    return word
}

async function getGame(gameID){
    console.log(gameID)
    let con = await connection
    let [game] = await con.query("SELECT * FROM game WHERE game_id = ?",[gameID])
    return game
}

async function addGuess(gameID, guess){
    let sql = "UPDATE game SET guess = ? WHERE game_id = ?"
    const insert = await con.query(sql, [gameID, guess]);
}

module.exports = {
    createGame,
    getWord,
    getGame,
    addGuess,
}