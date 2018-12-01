// Library Imports
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// Local Imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    //console.log(req.body);
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
}),

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

//CHALLENGE; GET /todos/1234234
app.get('/todos/:id', (req, res) => {
    // res.send(req.params);
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        console.log('USER ID not valid');
        return res.status(404).send();
        
    };
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send()
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000')
});

module.exports = {app};  













































// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo');
// });

// CHALLENGE
// var otherTodo = new Todo({
//     text: 'See Spurs smash Chelsea',
//     completed: true,
//     completedAt: 31
// })

// var otherTodo = new Todo({
//     text: '   Edit this video    '
// })

// otherTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log('Unable to save todo', e);
// });

//CHALLENGE


// let newUser = new User({
//     //email: 'bob.chahal@blueyonder.co.uk'
//     //email: '    reena@hotmail.com   '
//     //email: ''
// });

// newUser.save().then((mailAdd) => {
//     console.log('Saved email address', mailAdd);
// }, (e) => {
//     console.log('Unable to save user', e)
// });


