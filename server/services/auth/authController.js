const app = require('express')()

app.route('/profile')
    .get((req, res) => {
        res.send('Name: Yalo Age: 21 Sex: 2-3 per week')
})


module.exports = app