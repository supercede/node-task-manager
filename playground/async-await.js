// const sum = (a, b) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if(a < 0 || b < 0){
//                 return reject('Numbers should not be less than 0')
//             }
//             console.log(a+b);
//             resolve(a + b);
//         }, 2000)
//     })
// };

// const someFun = async () => {
//     const result = await sum(1, 400);
//     const result2 = await sum(result, 99);
//     const result3 = await sum(result2, -55);
//     return result3;
// }

// someFun().then(res => console.log(res))
//         .catch(err => console.log(err));


