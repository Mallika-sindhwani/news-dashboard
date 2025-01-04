import axios from 'axios';

const API_KEY = '5711cd7022a24e7db1850e393ab47a32';
const BASE_URL = 'https://newsapi.org/v2';

const newsApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export const getTopHeadlines = async (country = 'us', category = '') => {
  try {
    const params = {};
    params.q = country;
    if (category) {
      params.q = category;
    }
    console.log('Sending request with params:', params);

    const response = await newsApi.get('/everything', { params });
    console.log('API response:', response.data);

    if (response.data.status === 'ok') {
      if (response.data.totalResults === 0) {
        console.log('No articles found for the given parameters');
        return [];
      }
      return response.data.articles;
    } else {
      console.error('API returned an error:', response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
};

export const getAllNews = async (q = '') => {
  try {
    const params = { q };
    console.log('Sending request with params:', params);

    const response = await newsApi.get('/everything', { params });
    console.log('API response:', response.data);

    if (response.data.status === 'ok') {
      if (response.data.totalResults === 0) {
        console.log('No articles found for the given parameters');
        return [];
      }
      return response.data.articles;
    } else {
      console.error('API returned an error:', response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
};

export default newsApi;
