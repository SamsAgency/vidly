const mongoose = require('mongoose')
const winston = require('winston')

module.exports = () => {
    mongoose.connect('mongodb://localhost/vidly', {useUnifiedTopology: true,  useNewUrlParser: true})
    .then(() => winston.info('Connected to the database'))
}