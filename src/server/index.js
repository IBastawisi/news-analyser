import express from 'express';
import { sentimentAnalysis } from "./API.js";
import { PORT } from './config.js';

const app = express()

app.use(express.static('dist'))

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

app.listen(PORT, function () {
  console.log(`server listening on port ${PORT}!`)
})

app.get('/analyse', async function (req, res) {
  const url = req.query.url
  const data = await sentimentAnalysis(url)
  res.json(data)
})
