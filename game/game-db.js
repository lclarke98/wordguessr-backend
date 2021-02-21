const mysql = require('mysql2/promise')
const config = require('../db-config')
const connection = mysql.createConnection(config.mysql)


async function createGame(userSub)  {
    let con = await connection
    let [game] = await con.query("INSERT INTO game (user_id, game_mode,word) values (?,?,?)",[userSub])
    return game

}


module.exports = {
    createGame,
}