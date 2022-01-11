const Joi = require('joi');
const Express = require('express');
const app = Express();

app.use(Express.json());

const coursesDatabase = [
    {id: 1, name: 'course-1'},
    {id: 2, name: 'course-2'},
    {id: 3, name: 'course-3'},
];

class ApiPath{
    static base() { return '/api' };
    static courses() { return this.base() + '/courses'; }
    static courseID() { return this.courses() + ':id'; }
}

app.get(ApiPath.courses(), (req, res) => {
    res.send(coursesDatabase);
});



function validateCourse(course){
    const shema = Joi.object({name: Joi.string().min(3)});
    return shema.validate({name: course.name});
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));