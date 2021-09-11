const express = require('express');
const { sentimentAnalysis } = require('./API');
const { PORT } = require('./config');

const app = express()

app.use(express.static('dist'))

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

app.listen(PORT, function () {
  console.log(`server listening on port ${PORT}!`)
})

app.get('/api/analyse', async function (req, res) {
  const url = req.query.url
  const data = await sentimentAnalysis(url)
  res.json(data)
})
