import axios from 'axios';
const API_KEY = 'e3a5006031fb15b51def9b2796c1eb21';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const fetchMovies = async () => {
  const response = await axios(`/movie/top_rated?api_key=${API_KEY}`);
  return response.data;
};

export const fetchMoviesByID = async id => {
  const response = await axios(`/movie/${id}?api_key=${API_KEY}`);
  return response.data;
};

export const fetchReviews = async id => {
  const response = await axios(`/movie/${id}/reviews?api_key=${API_KEY}`);
  return response.data;
};

export const fetchCast = async id => {
  const response = await axios(`/movie/${id}/credits?api_key=${API_KEY}`);
  return response.data;
};
export const fetchMovieByQuery = async query => {
  const response = await axios(
    `/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return response.data;
};
