const { API_KEY } = require('./config');
const axios = require('axios');

const sentimentAnalysis = async (url) => {
  const response = await axios.get("https://api.meaningcloud.com/sentiment-2.1", {
    params: {
      key: API_KEY,
      lang: 'auto',
      url
    }
  });
  return response.data;
}

module.exports = { sentimentAnalysis }