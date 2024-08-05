import axios from "axios";

axios.defaults.baseURL = 'https://developer.themoviedb.org/3/'

axios.defaults.headers.common['Authorization'] =
 "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDQzNDA2NzI0NmZiNjhhODlhMzFiYTFlMWM0OGQyMSIsIm5iZiI6MTcyMjgwMjEwOC41MzExNDYsInN1YiI6IjY2YWZkZTJhNTZiN2UzMDEyZGUyMzRkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qbUJfAapspBRbICzVuCXi0c2dkLs6SburgXVhxOPVrw";


const defaultParams = {
    language: 'en-US'
};

const movieById = {
    include_adults: false,
    language: 'en-US',
    page: 1,
};

const titleParams = {
    include_adult: false,
    language: 'en-US',
    primary_release_year: '',
    page: 1,
    region: '',
    year: '',
  };
  
  const reviewParams = {
    language: 'en-US',
    page: 1,
  };


  export const fetchTrendingMovies = async () => {
    const response = await axios.get('/trending/movie/day', defaultParams);
    return response.data;
  };
  
  export const fetchMovieById = async movieId => {
    const response = await axios.get(`/movie/${movieId}`, movieById);
    return response.data;
  };
  
  export const fetchMovieByTitle = async movieTitle => {
    const response = await axios.get(
      `/search/movie?query=${movieTitle}`,
      titleParams
    );
    return response.data;
  };
  
  export const fetchMovieCredits = async movieId => {
    const response = await axios.get(`/movie/${movieId}/credits`, defaultParams);
    return response.data;
  };
  
  export const fetchMovieReviews = async movieId => {
    const response = await axios.get(`/movie/${movieId}/reviews`, reviewParams);
    return response.data;
  };