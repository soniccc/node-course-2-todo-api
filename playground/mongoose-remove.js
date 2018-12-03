const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({text: 'Something to do again'}).then((todo) => {
//     console.log(todo);
// });

Todo.findByIdAndRemove('5c0598a8fe1b97ad732f519a').then((todo) => {
    console.log(todo);
});


