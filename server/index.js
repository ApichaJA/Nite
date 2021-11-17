
const app = require('express')()

const routes = require('./routes')
const authAPI = require('./services/auth/authAPI')

// API Endpoints
app.use('/api/v1', routes)
app.use('/auth', authAPI)

module.exports = app
