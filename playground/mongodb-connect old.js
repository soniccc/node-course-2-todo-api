// MongoDB module v2

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connec to MongoDB server');
    }
    console.log('Cnnected to MongoDB server')

    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert ToDo', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.close();
});