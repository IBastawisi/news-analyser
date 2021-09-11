require('dotenv').config();

const PORT = process.env.PORT || '8081'
const API_KEY = process.env.API_KEY;

module.exports = { PORT, API_KEY}