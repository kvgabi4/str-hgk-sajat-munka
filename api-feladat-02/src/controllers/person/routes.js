const express = require('express');
const data = require('./data.json');

const controller = express.Router();

// Get people.
controller.get('/', (req, res) => {
    res.json(data);
});

// Get the number of vaccinated people.
controller.get('/count', (req, res) => {
    const vaccinatedPeople = data.filter(person => person.vaccine)
    res.json(vaccinatedPeople.length);
});

// Get vaccinated people.
controller.get('/vaccinated', (req, res) => {
    const vaccinatedPeople = data.filter(person => person.vaccine)
    res.json(vaccinatedPeople);
});

// Get one person. Whether the person has been vaccinated.
controller.get('/:id/vaccinated', (req, res) => {
    const person = data.find(p => p.id === parseInt(req.params.id));
    res.json(person.vaccine ? true : false);
});

// Create a new person.
controller.post('/', (req, res, next) => {
    const { last_name, first_name, vaccine } = req.body;
    if (!last_name || !first_name || !vaccine) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }
    const newPerson = req.body;
    newPerson.id = data[data.length - 1].id + 1;
    data.push(newPerson);

    res.status(201);
    res.json(newPerson);
});

// Update a person.
controller.put('/:id/:vaccine', (req, res, next) => {
    const id = req.params.id;
    const vaccine = req.params.vaccine;
    const index = data.findIndex(p => p.id === parseInt(id));
    const { first_name, last_name } = req.body;
    if (!last_name || !first_name) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }
    data[index] = {
        id,
        first_name,
        last_name,
        vaccine
    };
    res.json(data[index]);
});


module.exports = controller;
