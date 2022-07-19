const express = require('express')
const game = express.Router();
const bodyParser = require('body-parser')
const gc = require('./gameController')
const db = require("./game-db");
module.exports = game

game.use(bodyParser.json());
game.use(bodyParser.urlencoded({ extended: true }));

//pass all calls to game controller


game.post('/createGame', async (req, res) => {
    try {
        let game = await gc.createGame(req.body.sub, req.body.mode)
        res.send(game)
    }catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

game.get('/game', async (req, res) => {
    try {
        let game = await gc.getGame(req.query.gameID, req.query.userID)
        res.send(game)
    }catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

game.get('/allGames', async (req, res) => {
    try {
        let game = await db.getAllGames(req.query.userID)
        res.send(game)
    }catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

game.post('/guessLetter', async (req, res) => {
    try {
        let game = await gc.makeGuess(req.body.gameID, req.body.guess, req.body.count, req.body.userID)
        res.send(game)
    }catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

game.post('/guessWord', async (req, res) => {
    try {
        let game = await gc.guessWord(req.body.gameID, req.body.guess)
        res.send(game)
    }catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});