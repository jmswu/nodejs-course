const Express = require('express');
const app = Express();
app.use(Express.json());
const genres = require('./routes/genres');

app.use('/api/genres', genres)


// beware that the order of this operation
// if process.env.PORT is defined, it will use PORT first
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
