export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
  }
  export interface MovieSearchResponse {
    results: Movie[];
  }
  
  export interface MovieDetailResponse extends Movie {}