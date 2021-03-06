const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb')

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}, ];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
        Todo.find({text}).then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
            }).catch((e) => done(e));
        });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        
        .end((err, res) => {
            if (err) {
                return done(err);
            }
        Todo.find().then((todos) => {
            expect(todos.length).toBe(2);
            done();
            }).catch((e) => done(e));
        });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var testID = new ObjectID;
        request(app)
            .get(`/todos/${testID.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        var invalidTestID = '123'
        request(app)
            .get(`/todos/${invalidTestID}`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
            })
            Todo.findById(hexId).then((todo) => {
                expect(todo[1]).toBeFalsy();
                // expect(todo).not.toBeTruthy();
                done();
                }).catch((e) => done(e));
    });

    it('should return 404 if todo not found', (done) => {
        var testID = new ObjectID;
        request(app)
            .delete(`/todos/${testID.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        var invalidTestID = '123'
        request(app)
            .get(`/todos/${invalidTestID}`)
            .expect(404)
            .end(done);
    });
});

describe('UPDATE /todos/:id', () => {
    it('should update the todo', (done) => {
        var firstItemId = todos[0]._id.toHexString();
        var obj = {text: 'Text changed by test1', completed: true};
        request(app)
            .patch(`/todos/${firstItemId}`)
            .send(obj)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(firstItemId);
                expect(res.body.todo.text).toBe('Text changed by test1');
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done)

    });

    it('should clear completedAt when todo is not completed',(done) => {
        var secondItemId = todos[0]._id.toHexString();
        var obj = {text: 'Text changed by test2', completed: false};
        request(app)
            .patch(`/todos/${secondItemId}`)
            .send(obj)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(secondItemId);
                expect(res.body.todo.text).toBe('Text changed by test2');
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeFalsy();
            })
            .end(done)
    });
});



// toNotExist is now toBeFalsy
// toExist is now toBeTruthy
// toBeA has no equivalent so use expect(typeof res.body.todo.completedAt).toBe('number');