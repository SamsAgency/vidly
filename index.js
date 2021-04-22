require('express-async-errors')
require('winston-mongodb')
const winston = require('winston')
const error = require('./middlewares/error')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const config = require('config')
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')
const app = express();

// adding a winstion transport that logs winston errors in a file and the database
winston.add(winston.transports.File, {filename : 'logfile.log'})
winston.add(winston.transports.MongoDB, {db : 'mongodb://localhost/vidly', level : 'info'})

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR!!: jwtPrivateKey is not defined')
  process.exit(1)
}

mongoose.connect('mongodb://localhost/vidly', {useUnifiedTopology: true,  useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)

// this here must be the last middleware
app.use(error)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));