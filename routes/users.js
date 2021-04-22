const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')


// get the current user
router.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
})


// posting a user
router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const email = await User.findOne({email: req.body.email})
    if (email) return res.status(400).send('Invalid email or password')

    let user = new User(_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()

    const token = user.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']))
})

// updating a user
router.put('/:id', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const user = await User.findByIdAndUpdate(req.params.id, {
        $set : {
            name : req.body.name,
            email : req.body.email,
            password: req.body.password
        }
    }, {new : true})

    if (!user) return res.status(404).send('That user does not exist')
    res.send(user)
})

// deleting a user
router.delete('/:id', [auth, admin], async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id)
    if (!user) return res.status(404).send('That user does not exist')
    res.send(user)
})

// export
module.exports = router