const express = require('express');
const game = express.Router();
const bodyParser = require('body-parser')
const db = require('./game-db')
module.exports = game

game.use(bodyParser.json());
game.use(bodyParser.urlencoded({ extended: true }));

game.post('/create', async (req, res) => {
    try {
        console.log(req.body.guess)
        let game = await db.createGame()
        res.sendStatus(200)
    }catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});


