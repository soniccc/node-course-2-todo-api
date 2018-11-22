// MondgoDB module v3

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connec to MongoDB server');
    }
    console.log('Cnnected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5bf7355ad9f8d15d852a64a8')
    // }, {
    //    $set: {
    //        completed: true
    //    } 
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });
    
    // CHAHLLENGE
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5bef4ebe9594b28d5e31ca38')
    }, {
        $set: {
            name: 'Balvinder Pal Chahal'
        },
        $inc: {
            age: 5
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });


    //client.close();
});