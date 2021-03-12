const express = require('express')
const game = express.Router();
const bodyParser = require('body-parser')
const gc = require('./gameController')
const db = require('./game-db')
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
        let game = await gc.getGame(req.query.gameID)
        let arr = game[0].guesses.replace("'", "");
        let newArr = JSON.parse(arr)
        newArr.push({'guess':"b", 'correct': true})
        res.send(newArr)
    }catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

game.post('/guess', async (req, res) => {
    try {
        console.log(req.body.guess)
        let game = await gc.makeGuess(req.body.gameID, req.body.guess)
        res.send(game)
    }catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});
