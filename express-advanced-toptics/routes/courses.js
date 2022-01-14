const express = require('express');
const router = express.Router();

// class ApiPath{
//     static base() { return '/api' };
//     static courses() { return this.base() + '/courses'; }
//     static courseID() { return this.courses() + '/:id'; }
// }

const coursesDatabase = [
    {id: 1, name: 'course-1'},
    {id: 2, name: 'course-2'},
    {id: 3, name: 'course-3'},
];

router.get('/', (req, res) => {
    res.send(coursesDatabase);
});

router.get('/:id', (req, res) => {
    const oneCourse = coursesDatabase.find( c => c.id === parseInt(req.params.id));
    if (!oneCourse) return res.status(404).send('Given course ID was not found');
    res.send(oneCourse);
});

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const newCourse = {
        id: coursesDatabase.length + 1,
        name: req.body.name
    };
    coursesDatabase.push(newCourse);
    res.send(newCourse);
});

router.put('/:id', (req, res) => {
    const courseToUpdate = coursesDatabase.find( c => c.id === parseInt(req.params.id));
    if (!courseToUpdate) return res.status(404).send('Given course ID was not found');

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    courseToUpdate.name = req.body.name;
    res.send(courseToUpdate);
});

router.delete('/:id', (req, res) => {
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

module.exports = router;
