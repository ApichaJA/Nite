
const express = require("express")
const cors = require('cors')

const routes = require('./routes')
const authAPI = require('./services/auth/authAPI')
const shareAPI = require('./services/notes/shareAPI')
const commentsAPI = require('./services/comments/commentsAPI')
const favoriteAPI = require('./services/favorite/favoriteAPI')

const app = express()
app.use(cors())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
// API Endpoints
app.use('/api/v1', routes)
app.use('/auth', authAPI)
app.use('/share', shareAPI)
app.use('/service-comment', commentsAPI)
app.use('/favorite', favoriteAPI)

module.exports = app
