const {genreSchema} = require('./genre')
const mongoose = require('mongoose')
const Joi = require('joi')

// creating the model
const Movie = mongoose.model('Movie', new mongoose.Schema({
    title : {
        type : String,
        trim : true,
        minlength: 2,
        maxlength: 250,
        required: true
    },
    genre : {
        type : genreSchema,
        required: true
    },
    numberInStock : {
        type : Number,
        required: true,
        min: 0,
        max: 1000
    }, 
    dailyRentalRate : {
        type : Number,
        required: true,
        min: 0,
        max: 1000
    }
}))

// joi validation
const validateMovie = (movies) => {
    const schema = {
        title: Joi.string().min(2).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(1000).required(),
        dailyRentalRate: Joi.number().min(0).max(1000).required()
    }

    return Joi.validate(movies, schema)
}

exports.Movie = Movie
exports.validate = validateMovie