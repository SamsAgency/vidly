const {User} = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const config = require('config')

// in auth we only do post request
// login request
router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('Invalid email or password')

    // comparing passwords
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid or password')

    // generating the auth token
    const token = user.generateAuthToken()
    res.send(token)
})

// validating the logins
const validate = (req) => {
    const schema = {
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(6).max(255).required()
    }

    return Joi.validate(req, schema)
}

module.exports = router