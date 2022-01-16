const Joi = require('joi');             // input validation tool
const Express = require('express');     // simple web server
const app = Express();          
const logger = require('./middleware/logger');     // my middleware
const hemlet = require('helmet');       // set http header
const morgan = require('morgan');       // 3rd party logger
const config = require('config');       // environment tool
const debug = require('debug')('debug');        // debug package

// import routes
const courses = require('./routes/courses');    // courses route
const home = require('./routes/home');        // index route

// middlewares
app.use(hemlet());
app.use(Express.json());
app.use(Express.urlencoded({extended: true}));
app.use(Express.static('public'));
//app.use(logger.logger);

// using route
app.use('/api/courses', courses);
app.use('/', home);

// template engine
app.set('view engine', 'pug');
app.set('views', './views');

// testing config package
if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enable...');
    debug('Morgan enable');
}

console.log(`APP NAME: ${config.get('name')}`);
console.log(`MAIL SRV: ${config.get('mail.server')}`);
console.log(`MAIL PASS: ${config.get('mail.password')}`);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));