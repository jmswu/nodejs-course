const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playround')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);
const course = new Course({
    name: 'Node.js Course',
    author: 'James',
    tags: ['node', 'backend'],
    isPublished: true
});

course.save()
    .then(result => console.log(result));