import axios from "axios";

const url = "https://api.themoviedb.org/3";
//const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGI5YTc1ZDZlMzE3ZDUzNWM2MmJmZmJhNDM2N2Y1NSIsIm5iZiI6MTcyMDk0MTg5Ni4zMzQzNzMsInN1YiI6IjY2OTM3OTEzNzMwOGI1MGQ5YzljNjEyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Z4UIT7y_V-3AMGME_gm8k9bhzRICKOU7a1qz_n_We0s",
  },
};
export default async function getTrendMovie(searchUrl) {
  const newUrl = url + searchUrl;
  const trendMovie = await axios.get(newUrl, options);
  return trendMovie.data;
}