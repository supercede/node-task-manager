require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('5d8a60f1a3a87d096c883098', { age: 25 })
//     .then(user => {
//         console.log(user);
//         return User.countDocuments({ age: 25 })
//     })
//     .then(users => console.log(users))
//     .catch(err => console.log(err));


//5d8a60f1a3a87d096c883098
const updateAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
}

updateAndCount('5d8a60f1a3a87d096c883098', 32)
    .then(res => console.log(res))
    .catch(err => console.log(err));