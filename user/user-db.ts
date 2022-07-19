const mysql = require('mysql2/promise')
const config = require('../db-config')
const connection = mysql.createConnection(config.mysql)

// gets data for room
async function getUser(userSub)  {
    let con = await connection
    let [user] = await con.query("SELECT user_id from user where user_sub = ? ",[userSub])
    if (user.length === 1){
        console.log('this is the user: ',user)
        return user
    }else {
        let [user] = await con.query("INSERT INTO user (user_sub) values (?)",[userSub])
        return user
    }
}


module.exports = {
    getUser,
}