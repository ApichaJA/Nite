const app = require('express')()

const authController = require('./authController')

app.use('/account', authController)

app.route('/login')
  .get((req, res) => {
    res.sendStatus(200)
  })

module.exports = app
