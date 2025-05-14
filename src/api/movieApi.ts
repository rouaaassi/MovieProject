import axios from "axios";
import { MovieSearchResponse, MovieDetailResponse, Movie } from "../types/movie";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'e9617d626fc8dd80c2b3eae992d5a442';

// Search for movies
export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const res = await axios.get<MovieSearchResponse>(`${BASE_URL}/search/movie`, {
      params: { 
        api_key: API_KEY,
        query,
        language: 'en-US',
        include_adult: false
      }
    });
    return res.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Get movie details
export const getMovieDetails = async (id: number): Promise<Movie> => {
  try {
    const res = await axios.get<MovieDetailResponse>(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    });
    return res.data;
  } catch (error) {
    console.error('Error getting movie details:', error);
    throw error;
  }
};
