const express = require('express');
//const data = require('./data.json');
const Vaccine = require('../../models/vaccine.model');
const createError = require("http-errors");
const logger = require('../../config/logger');

const controller = express.Router();

// Get vaccines.
controller.get('/', async (req, res) => {
    const vaccines = await Vaccine.find();
    logger.debug(`Get all vaccines, returning ${vaccines.length} items.`);
    res.json(vaccines);
});


// // Get the number of vaccinated people.
// controller.get('/count', async (req, res) => {
//     const people = await Person.find();
//     const vaccinatedPeople = people.filter(person => person.vaccine);
//     logger.debug(`The number of vaccinated people are ${vaccinatedPeople.length}.`);
//     res.json(vaccinatedPeople.length);
// });

// // Get vaccinated people.
// controller.get('/vaccinated', async (req, res, next) => {
//     const people = await Person.find();
//     const vaccinatedPeople = people.filter(person => person.vaccine)
//     if (!vaccinatedPeople) {
//         return next(new createError.NotFound("Persons are not found"));
//     };
//     logger.debug(`Get all vaccinated people, returning ${vaccinatedPeople.length} items.`);
//     res.json(vaccinatedPeople);
// });

// // Get one person. Whether the person has been vaccinated.
// controller.get('/:id/vaccinated', async (req, res, next) => {
//     const person = await Person.findOne({ _id: req.params.id });
//     if (!person) {
//         return next(new createError.NotFound("Person is not found"));
//     };
//     logger.debug(`Indicates whether the person has been vaccinated.`);
//     res.json(person.vaccine ? true : false);
// });

// Create a new vaccine.
controller.post('/', async (req, res, next) => {
    const { name, efficiency } = await req.body;
    if (!name || !efficiency) {
        return next(
            new createError.BadRequest("Missing properties!")
            );
    }
    const newVaccine = new Vaccine({
        name: name,
        efficiency: efficiency
    });
    
    newVaccine.save()
        .then(data => {
            res.status(201);
            res.json(data);
        });
    logger.debug(`Posting a vaccine.`);
});
    
// Update a vaccine.
controller.put('/:id/:efficiency', async (req, res, next) => {
    const id = req.params.id;
    const efficiency = req.params.efficiency;
    if (!id || !efficiency) {
        return next(
            new createError.BadRequest("Missing properties!")
            );
    };
    
    let vaccine = {};
    try {
        vaccine = await Vaccine.findByIdAndUpdate(id, {efficiency: efficiency}, {
            new: true,
            useFindAndModify: false
        });
    } catch (err) {
        return next(new createError.BadRequest(err));
    }
    
    logger.debug(`The efficiency of vaccine has been updated.`);
    return res.json(vaccine);
});
        
// // Delete people on the basis of a vaccine.
// controller.delete('/:vaccine', async (req, res, next) => {
//     const vaccine = req.params.vaccine;

//     let notThatVaccine = {};
//     try {
//         notThatVaccine = await Person.deleteMany({vaccine: { $ne: vaccine }});
//         // const notThatVaccine = await Person.filter(p => p.vaccine !== req.params.vaccine);
//     } catch (err) {
//         return next(new createError.NotFound("People are not found"));
//     }

//     logger.debug(`The people not vaccinated with ${vaccine} were deleted.`);
//     res.json(notThatVaccine);
// });

module.exports = controller;
