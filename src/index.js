const express = require('express');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const jwt = require('jsonwebtoken');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     if(req.method === 'POST'){
//         return res.status(403).send('forbidden');
//     }
//     next();
// })

// app.use((req, res, next) => {
//     if(req.method){
//         return res.status(503).send('Site under Construction');
//     }
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(3000, () => {
    console.log('connected on port ' + port);
})

// const myFunc = async() => {
//     const key = jwt.sign({_id: 'asm123'}, 'mykeygoeshere');
//     console.log(key);

//     const data = jwt.verify(key, 'mykeygoeshere');
//     console.log(data);
// }

// myFunc();
