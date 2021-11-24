const app = require('express')()
const authenticateUser = require('../../lib/auth/verifyToken')

const { removeFav, myFav} = require('./favoriteController')

app.route('/my-favorite')
    .get(myFav) // add fev
    .delete(removeFav) // remove fev
module.exports = app
