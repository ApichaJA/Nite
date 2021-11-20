const app = require('express')()
const authAPI = require('./services/auth/authAPI')

// http://localhost:5001/auth/{path in authAPI.js}
app.use('/auth', authAPI)

module.exports = app
