require('./config/config');

// Library Imports
const _ = require('lodash'); 
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// Local Imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port =process.env.PORT || 3000;

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
        //console.log('USER ID not valid');
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

app.delete('/todos/:id', (req,res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        //console.log('invalid ID');
        return res.status(404).send();
    };
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            //console.log('Doc does not exist');
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send()
    });
});

app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        //console.log('invalid ID');
        return res.status(404).send();
    };

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

// POST /Users

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    //console.log(req.body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((e) => {
        res.status(400).send(e);
    });
}),

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


