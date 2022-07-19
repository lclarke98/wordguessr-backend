import {MongoClient} from 'mongodb';

const url = "mongodb://localhost:27017";

let _db;




function connectToServer( callback ) {
    MongoClient.connect( url, function( err, client ) {
        _db  = client.db('code-test');
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