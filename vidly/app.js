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

class ApiPath{
    static base() { return '/api'; }
    static genres(){ return this.base() + '/genres/'; }
    static genresID(){ return  this.genres() + ':id';}
}

app.get(ApiPath.genres(), (req, res) => {
    res.send(genresDatabase);
});

app.get(ApiPath.genresID(), (req, res) => {
    const genre = genresDatabase.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the givne ID was not found');
    res.send(genre);
});

app.post(ApiPath.genres(), (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genresDatabase.length + 1,
        name: req.body.name
    }
    genresDatabase.push(genre);
    res.send(genre);
});

app.delete(ApiPath.genresID(), (req, res) => {
    const genre = genresDatabase.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send('The genre with the given ID was not found.');
    const index = genresDatabase.indexOf(genre);
    genresDatabase.splice(index, 1);
    res.send(genre);
});

app.put(ApiPath.genresID(), (req, res) => {
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