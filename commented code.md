# Creating data

    console.log('COnnected');

    db.collection('users').insertMany([
        {
            name: 'Idris',
            age: 44
        },
        {
            name: 'Sam',
            age: '45'
        }
    ], (err, res) => {
        if(err){
            return console.log(err);
        }

        return console.log(res.ops);
    })

    db.collection('tasks').insertMany([
        {
            description: 'Buy Food',
            completed: true
        },
        {
            description: 'Eat food',
            completed: 'false'
        },
        {
            description: 'shit food',
            completed: false
        }
    ], (error, result) => {
        if(error){
            return console.log(error.message);
        }
    })


# Readingdata

db.collection('users').findOne({ _id: new ObjectID('5d88ba4984512935a0c80625') }, (err, user) => {
        if(err){
            return console.log('Unable to fetch user')
        }
        //findOne will return null if nothing is found 

        console.log(user);
})
