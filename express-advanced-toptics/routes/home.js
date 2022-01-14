const express = require('express');
const route = express();

route.get('/', (req, res) => {
    res.render('index', {title: 'My Express App', message: 'Hello'});
});

module.exports = route;