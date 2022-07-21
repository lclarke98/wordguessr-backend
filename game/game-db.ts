import {getDb} from "../mongo-config";
import {ObjectId} from "mongodb";

// const mysql = require('mysql2/promise')
// const config = require('../db-config')
// const connection = mysql.createConnection(config.mysql)

async function createGame(userSub:string,gameMode:string, word:string, count:number)  {
    try {
        let db = await getDb();
        let id
        let game = {
            'user_id': userSub,
            'game_mode': gameMode,
            'word': word,
            'count': count,
            'complete': false,
            'game_result': '',
            'guesses': [],
            "date_created": Date.now()
        };

        let insert = await db.collection("games")
            .insertOne(game)

        return insert.insertedId.toString()
    } catch (e) {
        console.error(e);
        return "error";
    }
}

async function getGame(gameID:string, userID:string){
    try {
        let db = await getDb();
        console.log('the passed game id: ', gameID)
        let game = await db.collection("games")
            .find({"_id" : new ObjectId(gameID)})
            .toArray()

        return game

    } catch (e) {
        console.error(e);
        return "error";
    }
}

async function getAllGames(userID:number){
    try {
        let db = await getDb();

        return await db.collection("games")
            .find({user_id: userID})
            .toArray()

    } catch (e) {
        console.error(e);
        return "error";
    }
}

async function addGuess(gameID:string, guess:string, count:number){
    try {
        let db = await getDb()
        console.log(gameID, guess)
        await db.collection('games').updateOne({
            _id: new ObjectId(gameID)
        }, {
            $set: {
                guesses: guess
            }
        })
    } catch (e) {
        console.log(e)
    }
}

async function setComplete(gameID:string){
    try {
        let db = await getDb()
        await db.collection('games').updateOne({
            _id: new ObjectId(gameID)
        }, {
            $set: {
                complete: true
            }
        })
    } catch (e) {
        console.log(e)
    }
}



export {
    createGame,
    getAllGames,
    getGame,
    addGuess,
    setComplete
}