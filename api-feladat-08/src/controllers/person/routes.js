const express = require('express');
//const data = require('./data.json');
const Person = require('../../models/person.model');
const createError = require("http-errors");
const logger = require('../../config/logger');

const controller = express.Router();

// Get people.
controller.get('/', async (req, res) => {
    const people = await Person.find();
    logger.debug(`Get all people, returning ${people.length} items.`);
    res.json(people);
});


// Get the number of vaccinated people.
controller.get('/count', async (req, res) => {
    const people = await Person.find();
    const vaccinatedPeople = people.filter(person => JSON.stringify(person.vaccine) !== '{}');
    logger.debug(`The number of vaccinated people are ${vaccinatedPeople.length}.`);
    res.json(vaccinatedPeople.length);
});

// Get vaccinated people.
controller.get('/vaccinated', async (req, res, next) => {
    const people = await Person.find();
    const vaccinatedPeople = people.filter(person => JSON.stringify(person.vaccine) !== '{}')
    if (!vaccinatedPeople) {
        return next(new createError.NotFound("Persons are not found"));
    };
    logger.debug(`Get all vaccinated people, returning ${vaccinatedPeople.length} items.`);
    res.json(vaccinatedPeople);
});

// Get one person. Whether the person has been vaccinated.
controller.get('/:id/vaccinated', async (req, res, next) => {
    const person = await Person.findOne({ _id: req.params.id });
    if (!person) {
        return next(new createError.NotFound("Person is not found"));
    };
    logger.debug(`Indicates whether the person has been vaccinated. ${person.vaccine}`);
    res.json(JSON.stringify(person.vaccine) !== '{}' ? true : false);
});

// Create a new person.
controller.post('/', async (req, res, next) => {
    const { last_name, first_name, vaccine } = await req.body;
    if (!last_name || !first_name) {
        return next(
            new createError.BadRequest("Missing properties!")
            );
    }
    const newPerson = new Person({
        first_name: first_name,
        last_name: last_name,
        vaccine: vaccine
    });
    
    newPerson.save()
    .then(data => {
        res.status(201);
        res.json(data);
    });
    logger.debug(`Posting a person.`);
});
    
// Update a person.
controller.put('/:id/:vaccine/:count', async (req, res, next) => {
    const id = req.params.id;
    const vaccine = req.params.vaccine;
    const count = req.params.count;
    if (!id || !vaccine) {
        return next(
            new createError.BadRequest("Missing properties!")
            );
    };
    
    let person = {};
    try {
        person = await Person.findByIdAndUpdate(id, { vaccine: { vaccine, count }}, {
            new: true,
            useFindAndModify: false
        });
    } catch (err) {
        return next(new createError.BadRequest(err));
    }
    
    logger.debug(`The person's vaccination has been updated.`);
    return res.json(person);
});
        
// Delete people on the basis of a vaccine.
controller.delete('/:vaccine', async (req, res, next) => {
    const vaccine = req.params.vaccine;

    let notThatVaccine = {};
    try {
        notThatVaccine = await Person.deleteMany({ 'vaccine.vaccine': { $ne: vaccine } });
    } catch (err) {
        return next(new createError.NotFound("People are not found"));
    }

    logger.debug(`The people not vaccinated with ${vaccine} were deleted.`);
    res.json(notThatVaccine);
});

module.exports = controller;
