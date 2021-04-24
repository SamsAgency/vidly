require('winston-mongodb')
require('express-async-errors')
const winston = require('winston')
const error = require('../middlewares/error')

module.exports = () => {
    // handling uncaught exceptions
  process.on('uncaughtException', (exp) => {
    winston.error(exp.message, exp)
    process.exit(1)
  })
  
  // handling promise rejections
  process.on('unhandledRejection', (exp) => {
    winston.error(exp.message, exp)
    process.exit(1)
  })
  
  // adding a winstion transport that logs winston errors in a file and the database
  winston.add(winston.transports.File, {filename : 'logfile.log'})
  winston.add(winston.transports.MongoDB, {db : 'mongodb://localhost/vidly', level : 'info'})
  
}