const express = require('express');
const router = express.Router();

const Joi = require('joi');

const genresDatabase = [
    { id: 1, name: 'Action'     },
    { id: 2, name: 'SciFi'      },
    { id: 3, name: 'Romance'    },
];

router.get('/', (req, res) => {
    res.send(genresDatabase);
});

router.get('/:id', (req, res) => {
    const genre = genresDatabase.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the givne ID was not found');
    res.send(genre);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genresDatabase.length + 1,
        name: req.body.name
    }
    genresDatabase.push(genre);
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genresDatabase.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send('The genre with the given ID was not found.');
    const index = genresDatabase.indexOf(genre);
    genresDatabase.splice(index, 1);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    // Double equals (==) is a comparison operator, which transforms the operands having the same type before comparision
    // Triple equals (===) is a strict equality comparision operator, which returns false for the values which are not of a
    // similar type. This operator performs type casting for equality.
    const genre = genresDatabase.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send('The genre with the given ID was not found.');

    genre.name = req.body.name;
    res.send(genre);
});

function validateGenre(genre)
{
    const scheme = Joi.object({
        name: Joi.string().min(3).required()
    });

    return scheme.validate({name: genre.name});
}

module.exports = router;
