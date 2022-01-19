const p1 = new Promise((resolved) => {
    setTimeout(() => {
        console.log('Reading API 1...');
        resolved({id: 1, name: 'hello', text: 'extra text'});
    }, 3000)
});

const p2 = new Promise((resolved) => {
    setTimeout(() => {
        console.log('Reading API 2...');
        resolved({id: 23, name: 'blah'});
    }, 1000)
});


// Promise.race([p1, p2])
//     .then(result => console.log(result));

Promise.all([p1, p2])
    .then(result => console.log(result));