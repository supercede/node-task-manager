const express = require('express');
const Task = require('../models/task');
const router = express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try{
        await task.save();
        res.status(201).send(task);
    }catch(err){
        res.status(400).json(err.message);
    }
})

router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find();
        res.send(tasks);

    }catch(err){
        res.status(500).send(err.message);
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const task = await Task.findById(_id);
        return !task ? res.status(404).send('User not found') : res.send(task);
    }catch(err){
        res.status(406).send('Please enter a valid id');
    }
})

router.patch('/tasks/:id', async(req, res) => {
    const allowedParams = Object.keys(Task.schema.obj);
    const givenParams = Object.keys(req.body);
    let isAllowed = givenParams.every(param => allowedParams.includes(param));

    if(!isAllowed){
        return res.status(400).send('Invalid, Valid fields are: description or completed')
    }
    const _id = req.params.id;
    try{
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });

        return !task ? res.send(404).status('Task not found') : res.send(task);
    }catch(err){
        res.status(500).send(err.message);
    }
})

router.delete('/tasks/:id', async(req, res) => {
    const _id = req.params.id;
    try{
        const task = await Task.findByIdAndDelete(_id)
        return !task ? res.status(404).send('Task not Found') : res.status(202).send(task);
    }catch(err){
        res.status(500).send(err.message);
    }
})

module.exports = router;