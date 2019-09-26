const express = require('express');
const User =require('../models/user');

const router = express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        res.status(201).send(user);
    }catch(err){
        console.log(req.body)
        res.status(400).send(err.message);
    }
})

router.get('/users', async (req, res) => {
    try{
        const users = await User.find();
        res.send(users);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try{
        const user = await User.findById(_id)
        return !user ? res.status(404).send('User not found') : res.send(user);

    }catch(err){
        res.status(406).send('Please use a valid id')
    }
})

router.patch('/users/:id', async(req, res) => {
    const allowedParams = Object.keys(User.schema.obj);
    const givenParams = Object.keys(req.body);
    let isAllowed = givenParams.every(param => allowedParams.includes(param));

    if(!isAllowed){
        return res.status(400).send('Invalid, Valid fields are: name, age, password or email')
    }

    const _id = req.params.id;
    try{
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        return !user ? res.status(404).send('User not found') : res.send(user);
    }catch(err){
        res.status(500).send(err.message)
    }
})

router.delete('/users/:id', async(req, res) => {
    const _id = req.params.id;
    try{
        const user = await User.findByIdAndDelete(_id)
        return !user ? res.status(404).send('User not Found') : res.send(user);
    }catch(err){
        res.status(500).send(err.message);
    }
})

module.exports = router;

const bcrypt = require('bcrypt');

const myFunction = async () => {
    const password = 'redssamp';
    const hashPassword = await bcrypt.hash(password, 8).catch(err => console.log(err));

    console.log(await bcrypt.compare('redssamp', hashPassword));
   // console.log(password, hashPassword);
}

myFunction()