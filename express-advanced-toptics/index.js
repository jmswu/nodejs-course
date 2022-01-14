const Joi = require('joi');             // input validation tool
const Express = require('express');     // simple web server
const app = Express();          
const logger = require('./logger');     // my middleware
const hemlet = require('helmet');       // set http header
const morgan = require('morgan');       // 3rd party logger
const config = require('config');       // environment tool
const debug = require('debug')('debug');
const courses = require('./routes/courses');

app.use(hemlet());
app.use(Express.json());
app.use(Express.urlencoded({extended: true}));
app.use(Express.static('public'));
//app.use(logger.logger);
app.use('/api/courses', courses);

app.set('view engine', 'pug');
app.set('views', './views');

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enable...');
    debug('Morgan enable');
}

console.log(`APP NAME: ${config.get('name')}`);
console.log(`MAIL SRV: ${config.get('mail.server')}`);
console.log(`MAIL PASS: ${config.get('mail.password')}`);

app.get('/', (req, res) => {
    res.render('index', {title: 'My Express App', message: 'Hello'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));