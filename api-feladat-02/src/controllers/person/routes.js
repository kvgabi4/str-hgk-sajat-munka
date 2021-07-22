const express = require('express');
const data = require('./data');

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

module.exports = controller;
