const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey  = fs.readFileSync('key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};
const express = require('express');
const app = express();

const cors = require('cors');

// use it before all route definitions
app.use(function(req, res, next) {
    console.log("TEST")
    res.header("Access-Control-Allow-Origin", "https://wordguessr.com"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use('/game', require('./game'));
app.use('/user', require('./user'));

// your express configuration here
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(443);
