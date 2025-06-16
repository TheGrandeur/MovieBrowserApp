import axios from 'axios';

const API_KEY = '55fadd3a40c35012851186b508762905';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async (page = 1) => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY, language: 'en-US', page },
    });
    return res.data.results;
  } catch (err) {
    console.error('Error fetching popular movies:', err);
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}/search/movie`, {
      params: { api_key: API_KEY, language: 'en-US', query },
    });
    return res.data.results;
  } catch (err) {
    console.error('Error searching movies:', err);
    return [];
  }
};

export const getMovieDetailsById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: { api_key: API_KEY, language: 'en-US' },
    });
    return res.data;
  } catch (err) {
    console.error(`Error fetching movie details for ID ${id}:`, err);
    return null;
  }
};