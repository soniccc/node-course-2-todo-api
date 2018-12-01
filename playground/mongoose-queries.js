const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

// var id = '5c006072b0040a8b6e471185';


// if (!ObjectID.isValid()) {
//     console.log('ID not valid');
// };

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

//////////////////////////////////////////////////////////
// CHALLENGE User.findByID

const {User} = require('./../server/models/user');

var UserId = '5bfdcb0fb5e6f57698ab9a2c';

if (!ObjectID.isValid()) {
    console.log('USER ID not valid');
};

User.findById(UserId).then((user) => {
        if (!user) {
            return console.log('Id not found');
        }
        console.log(JSON.stringify(user, undefined, 2));
    }).catch((e) => console.log(e));
    
//////////////////////////////////////////////////////////





