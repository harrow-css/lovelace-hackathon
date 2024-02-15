
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Needed for nuxt.js
module.exports = {
    path: "/api",
    handler: app,
};