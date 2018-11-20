// MondgoDB module v3

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connec to MongoDB server');
    }
    console.log('Cnnected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').find().toArray().then((docs) => {
    // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    // db.collection('Todos').find({
    //     _id: new ObjectID('5bf4162a9e0a1e53db8c6630')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, 'undefined', 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });
   
    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: 'Balvinder Chahal'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, 'undefined', 2));
    }, (err) => {
        console.log('Unable to fetch users', err);
    });

    //client.close();
});