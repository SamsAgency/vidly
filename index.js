
const express = require('express');
const app = express();

require('./startup/logging')
require('./startup/routers')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/validation')

// the error
// const p = Promise.reject(new Error('Something failed terribly'))
// p.then(() => console.log('Done!!'))



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));