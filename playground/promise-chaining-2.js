require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5d8b88bca527273d00f7cac2')
//     .then(res => {
//         console.log(res);
//         return Task.countDocuments({ completed: false });
//     })
//     .then(val => console.log(val))
//     .catch(err => console.log(err));

Task.find().then(data => console.log(data))
