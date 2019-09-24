const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/task-manager-api', { useNewUrlParser: true, useCreateIndex: true });

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const person = new User({
    name: 'Ajagun',
    age: 35
})

person.save().then(data => console.log(data))
    .catch(err => console.log(err));