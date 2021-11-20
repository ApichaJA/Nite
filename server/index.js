
const express = require("express")

const routes = require('./routes')
const authAPI = require('./services/auth/authAPI')

const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// API Endpoints
app.use('/api/v1', routes)
app.use('/auth', authAPI)

module.exports = app
