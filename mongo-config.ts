import {MongoClient} from 'mongodb';

const url = "mongodb://localhost:27017";

let _db: any;


function connectToServer( callback:any ) {
    MongoClient.connect( url, function( err:any, client:any ) {
        _db  = client.db('wordguessr');
        return callback( err );
    } );
}

function getDb() {
    return _db;
}

export {
    connectToServer,
    getDb
}