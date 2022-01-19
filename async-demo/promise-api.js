const p = Promise.resolve({id: 1});
p.then(resolved => console.log(resolved));