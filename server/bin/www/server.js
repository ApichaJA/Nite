const app = require('../../index');
const http = require('http');
const conn = require("../../util/mongodb");

require('dotenv').config({
  path: '../../.env'
})

// Get port from environment and store in Express.
const port = process.env.PORT || '5001';
app.set('port', port);

// Create HTTP server.
http.createServer(app).listen(port, null, () => console.log(`LISTENING ON PORT ${port}`))
