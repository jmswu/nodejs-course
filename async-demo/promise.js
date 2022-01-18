const p = new Promise((resolve, reject) => {
    // kick off some async work
    // ...
    setTimeout(() => {
        //resolve(123);
        reject(new Error('errObj'));
    }, 2000);
});

p
    .then(result => console.log('Result', result))
    .catch(err => console.log('catch Error:', err.message));