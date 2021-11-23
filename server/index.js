
const express = require("express")
const cors = require('cors')

const routes = require('./routes')
const authAPI = require('./services/auth/authAPI')
const shareAPI = require('./services/notes/shareAPI')
const commentsAPI = require('./services/comments/commentsAPI')

const app = express()
app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// API Endpoints
app.use('/api/v1', routes)
app.use('/auth', authAPI)
app.use('/share', shareAPI)
app.use('/service-comment', commentsAPI)

module.exports = app
