// @ts-ignore
import express from 'express'
import cors from "cors";
import user from './user'
import game from './game'
import {connectToServer} from "./mongo-config";
// @ts-ignore
import http from "http";


const port = 1024;


connectToServer( function( err: any, client:any) {
    if (err) console.log('an error: ',err);
    const app = express();

    app.use(cors({origin: 'http://localhost:8080'}));

    console.log(process.env.PORT)

    app.use('/game', game );
    app.use('/user', user);

    const httpServer = http.createServer(app);

    httpServer.listen(port);

} );