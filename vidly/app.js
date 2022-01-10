const Express = require('express');
const { func } = require('joi');
const app = Express();
app.use(Express.json());

const Joi = require('joi');

const genresDatabase = [
    { id: 1, name: 'Action'     },
    { id: 2, name: 'SciFi'      },
    { id: 3, name: 'Romance'    },
];

const API_ADDR = '/api/genres/';

app.get(API_ADDR, (req, res) => {
    res.send(genresDatabase);
});

app.post(API_ADDR, (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genresDatabase.length + 1,
        name: req.body.name
    }
    genresDatabase.push(genre);
    res.send(genre);
});

// beware that the order of this operation
// if process.env.PORT is defined, it will use PORT first
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

function validateGenre(genre)
{
    const scheme = Joi.object({
        name: Joi.string().min(3).required()
    });

    return scheme.validate({name: genre.name});
}