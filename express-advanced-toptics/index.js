const Joi = require('joi');
const Express = require('express');
const app = Express();
const logger = require('./logger');
const hemlet = require('helmet');
const morgan = require('morgan');

app.use(hemlet());
app.use(Express.json());
app.use(Express.urlencoded({extended: true}));
app.use(Express.static('public'));
//app.use(logger.logger);

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enable...');
}

const coursesDatabase = [
    {id: 1, name: 'course-1'},
    {id: 2, name: 'course-2'},
    {id: 3, name: 'course-3'},
];

class ApiPath{
    static base() { return '/api' };
    static courses() { return this.base() + '/courses'; }
    static courseID() { return this.courses() + '/:id'; }
}

app.get(ApiPath.courses(), (req, res) => {
    res.send(coursesDatabase);
});

app.get(ApiPath.courseID(), (req, res) => {
    const oneCourse = coursesDatabase.find( c => c.id === parseInt(req.params.id));
    if (!oneCourse) return res.status(404).send('Given course ID was not found');
    res.send(oneCourse);
});

app.post(ApiPath.courses(), (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const newCourse = {
        id: coursesDatabase.length + 1,
        name: req.body.name
    };
    coursesDatabase.push(newCourse);
    res.send(newCourse);
});

app.put(ApiPath.courseID(), (req, res) => {
    const courseToUpdate = coursesDatabase.find( c => c.id === parseInt(req.params.id));
    if (!courseToUpdate) return res.status(404).send('Given course ID was not found');

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    courseToUpdate.name = req.body.name;
    res.send(courseToUpdate);
});

app.delete(ApiPath.courseID(), (req, res) => {
    const courseToDelete = coursesDatabase.find( c => c.id === parseInt(req.params.id));
    if (!courseToDelete) return res.status(404).send('Given course ID was not found');

    const index = coursesDatabase.indexOf(courseToDelete);
    coursesDatabase.splice(index, 1);
    res.send(courseToDelete);
});

function validateCourse(course){
    const shema = Joi.object({name: Joi.string().min(3).required()});
    return shema.validate({name: course.name});
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));