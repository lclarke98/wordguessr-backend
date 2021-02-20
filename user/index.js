const express = require('express');
const user = express.Router();
const bodyParser = require('body-parser')
module.exports = user

user.use(bodyParser.json());
user.use(bodyParser.urlencoded({ extended: true }));


//check if user already in system, if not then add user
user.post('/user', async (req, res) => {
    try {
        console.log(req.body.sub)
        res.sendStatus(200)
    }catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});


