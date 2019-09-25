const sum = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000)
    })
}

// sum(3, 5).then(res => {
//     console.log(res)
//     sum(res, 9).then(val => console.log(val))
//         .catch(e => console.log(e))
// })
//     .catch(err => console.log(err));

sum(3, 5).then(res => {
    console.log(res);
    return sum(res, 7);
}).then(val => {
    console.log(val);
    return sum(val, 5);
}).then(val2 => console.log(val2))
    .catch(err => console.log(err.message));
