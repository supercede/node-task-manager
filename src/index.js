const express = require('express');
const User = require('./models/user');
const Task = require('./models/task');
require('./db/mongoose');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save()
        .then(result => res.status(201).send(result))
        .catch(err => res.status(400).send(err.message))


})

app.get('/users', (req, res) => {
    User.find()
        .then(users => res.send(users))
        .catch(err => res.status(500).send(err.message));
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id)
        .then(user => {
            return !user ? res.status(404).send('User not found') : res.send(user);
        })
        .catch(err => res.status(406).send('Please use a valid id'));
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save()
        .then(result => res.status(201).send(result))
        .catch(err => res.status(400).json(err.message));
})

app.get('/tasks', (req, res) => {
    Task.find()
        .then(tasks => res.send(tasks))
        .catch(err => res.status(500).send(err.message));
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    Task.findById(_id)
        .then(task => {
            return !task ? res.status(404).send('Not found') : res.send(task);
        })
        .catch(err => res.status(406).send('Enter a valid id'));
})

app.listen(3000, () => {
    console.log('connected on port ' + port);
})