
const app = require('express')()
const routes = require('./routes')

app.use('/api/v1', routes)

module.exports = app
