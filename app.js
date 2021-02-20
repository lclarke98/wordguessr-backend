const express = require('express');
const app = express();
const cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:1024'}));

app.use('/game', require('./game'));

app.use('/user', require('./user'));

//App runs on port 80
const port = process.env.PORT || 8080;

app.listen(port, (err) => {
    if (err) console.log('error', err);
    else console.log(`app listening on port ${port}`);
});




//user
//creat user
//get user data


//game
//create game