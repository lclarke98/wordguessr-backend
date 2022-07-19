import express from 'express';
import {connectToServer} from "./mongo-config";
// @ts-ignore
import http from "http";
const cors = require('cors');

const port = 8080;


connectToServer( function( err: any, client:any) {
    if (err) console.log('an error: ',err);
    const app = express();

    app.use(cors({origin: 'http://localhost:8080'}));

    console.log(process.env.PORT)

    app.use('/game', require('./game'));
    app.use('/user', require('./user'));

    const httpServer = http.createServer(app);

    httpServer.listen(1024);

} );