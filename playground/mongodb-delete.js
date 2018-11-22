// MondgoDB module v3

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connec to MongoDB server');
    }
    console.log('Cnnected to MongoDB server');
    const db = client.db('TodoApp');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // CHALLENGE - deleteMany
    // db.collection('Users').deleteMany({name: 'Balvinder Chahal'}).then((result) => {
    //     console.log(result);
    // });

    //CHALLENGE - findOneAndDelete
    db.collection('Users').findOneAndDelete({
        _id : ObjectID('5bf180f68941c50516257e4e')
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });



    //client.close();
});