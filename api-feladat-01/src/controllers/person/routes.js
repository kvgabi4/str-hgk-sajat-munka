const express = require('express');
const data = require('./data');

const controller = express.Router();

controller.get('/', (req, res) => {
    res.json(data);
});

controller.get('/count', (req, res) => {
    const vaccinatedPeople = data.filter(person => person.vaccine)
    res.json(vaccinatedPeople.length);
});

controller.get('/vaccinated', (req, res) => {
    const vaccinatedPeople = data.filter(person => person.vaccine)
    res.json(vaccinatedPeople);
});

module.exports = controller;
