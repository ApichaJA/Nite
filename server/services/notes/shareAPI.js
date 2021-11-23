const app = require('express')()
const authenticateUser = require('../../lib/auth/verifyToken')

const { getNotes, myNote, createNote, editNote } = require('./shareController')

app.route('/notes')
    .get(getNotes) // get all Note and by nid

app.route('/my-notes')
    .get(myNote) // get Note by uuid
    .post(createNote) // create note
    .put(editNote) // edit note filter by nid
// .delete() //remove note
module.exports = app
