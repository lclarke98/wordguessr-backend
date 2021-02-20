const express = require('express');
const game = express.Router();
const bodyParser = require('body-parser')
module.exports = game

game.use(bodyParser.json());
game.use(bodyParser.urlencoded({ extended: true }));

game.post('/test', async (req, res) => {
    try {
        console.log(req.body.guess)
        res.sendStatus(200)
    }catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});


