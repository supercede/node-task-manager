require('../src/db/mongoose');
const Task = require('../src/models/task');


// Task.findByIdAndDelete('5d8b88bca527273d00f7cac2')
// .then(res => {
//     console.log(res);
//     return Task.countDocuments({ completed: false });
// })
// .then(val => console.log(val))
// .catch(err => console.log(err));

// 5d8b177c3715f727bcc6e207

const deleteTaskAndCount = async (id) => {
    const deletedTask = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });
    return count;
}

deleteTaskAndCount('5d8b8933c27b7e23b03abcc6')
    .then(res => console.log(res))
    .catch(err => console.log(err));

