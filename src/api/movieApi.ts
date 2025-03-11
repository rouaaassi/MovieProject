import axios from "axios";
import { MovieSearchResponse, MovieDetailResponse, Movie } from "../types/movie";

const API_KEY = 'e9617d626fc8dd80c2b3eae992d5a442';
const BASE_URL = 'https://api.themoviedb.org/3';

// Search for movies
export const searchMovies = async (query: string): Promise<Movie[]> => {
  const res = await axios.get<MovieSearchResponse>(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query }
  });
  return res.data.results;
};

// Get movie details
export const getMovieDetails = async (id: number): Promise<Movie> => {
  const res = await axios.get<MovieDetailResponse>(`${BASE_URL}/movie/${id}`, {
    params: { api_key: API_KEY }
  });
  return res.data;
};
