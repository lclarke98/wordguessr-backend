const express = require('express');
const user = express.Router();
const bodyParser = require('body-parser')
const db = require('./user-db')
module.exports = user

user.use(bodyParser.json());
user.use(bodyParser.urlencoded({ extended: true }));


//check if user already in system, if not then add user
user.post('/user', async (req:any, res:any) => {
    try {
        const userSub = req.body.sub
        res.send(await db.getUser(userSub))
    }catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});


