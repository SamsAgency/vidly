const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

// creating the schema
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        minlength : 4,
        maxlength : 100
    },
    email : {
        type: String,
        required: true,
        minlength : 5,
        maxlength : 255,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength: 6,
        maxlength: 1024
    }
})

// adding a generate token method to the user
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'))
    return token
}

// the model
const User = mongoose.model('User', userSchema)


// validating the user
const validateUser = (user) => {
    const schema = {
        name: Joi.string().min(4).max(100).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(6).max(255).required()
    }

    return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser
exports.userSchema = userSchema