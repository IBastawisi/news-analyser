import { API_KEY } from './config.js';
import axios from "axios";

export const sentimentAnalysis = async (url) => {
  const response = await axios.get("https://api.meaningcloud.com/sentiment-2.1", {
    params: {
      key: API_KEY,
      lang: 'auto',
      url
    }
  });
  return response.data;
}