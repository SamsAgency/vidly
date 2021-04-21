const mongoose = require('mongoose')

// creating the Id
const id = mongoose.Types.ObjectId()
console.log(id)

const timeStamp = id.getTimestamp()
console.log(timeStamp)

const isValid = mongoose.Types.ObjectId.isValid('text')
console.log(isValid)