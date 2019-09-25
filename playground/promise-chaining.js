require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('5d8a60f1a3a87d096c883098', { age: 25 })
    .then(user => {
        console.log(user);
        return User.countDocuments({ age: 25 })
    })
    .then(user2 => console.log(user2))
    .catch(err => console.log(err));