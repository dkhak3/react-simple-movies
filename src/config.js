export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "3238cac8a852278ff6dd73e5ff77031e";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `https://api.themoviedb.org/3/${type}?api_key=${apiKey}&page=${page}`,
  getMovieById: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
  getMovieSearch: (query, page) =>
    `https://api.themoviedb.org/3/search/movie?api_key=3238cac8a852278ff6dd73e5ff77031e&query=${query}&page=${page}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/500/${url}`,
};
