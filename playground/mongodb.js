const mongodb = require('mongodb');
const { MongoClient, ObjectID } = mongodb

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
// console.log(id);
// console.log(id.id);
// console.log(id.id.length);
// console.log(id.toHexString());
// console.log(id.toHexString().length);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
    if(err){
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName);

    db.collection('users').find({ name: 'Adetiba' }).toArray((err, users) => {
        console.log(users)
    })

    db.collection('users').find({ name: 'Adetiba' }).count((err, users) => {
        console.log(users)
    })


})

