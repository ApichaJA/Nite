const app = require('express')()

app.route('/test')
  .get((req, res) => {
    res.send('Hello, world!')
  })
  .post((req, res) => {
    res.json({
      text: req.body
    })
  })

module.exports = app
