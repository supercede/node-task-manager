const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1/task-manager-api', { useNewUrlParser: true, useCreateIndex: true });

const User = mongoose.model('User', {
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('entry is not a valid email address');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a valid number');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        lowercase: true,
        validate(value){
            if(value.includes('password')){
                throw new Error('Password not allowed');
            }
            
        }
    } 
})



const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false

    }
})

const myTask = new Task({
    completed: true
})

myTask.save()
        .then(res => console.log(res))
        .catch(err => console.log(err))


