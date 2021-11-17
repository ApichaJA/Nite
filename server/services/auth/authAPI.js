const app = require('express')()

app.route('/account')
  .get((req, res) => {
    res.send('test')
  })

module.exports = app
