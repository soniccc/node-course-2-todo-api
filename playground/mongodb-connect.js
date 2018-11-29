// MondgoDB module v3

// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


//ES6 Destructuring - make new variables from an object's properties
// var user = {name: 'Andrew', age: 25};
// var {name} = user;
// console.log(name);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connec to MongoDB server');
    }
    console.log('Cnnected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert ToDo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // Insert new doc into Users (name, age, location)
    // db.collection('Users').insertOne({
    //     // _id: 123,
    //     name : 'Balvinder Chahal',
    //     age: 21,
    //     location: 'Heathrow'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert Users', err);
    //     }
    //     // console.log(JSON.stringify(result.ops, undefined, 2));
    //     // console.log(JSON.stringify(result.ops[0]._id, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    client.close();
});