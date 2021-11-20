const app = require('express')()
const authController = require('./authController')

app.use('/account', authController)

app.route('/login')
  .post((req, res) => {
    console.log(req)
    res.sendStatus(200)
  })

module.exports = app
