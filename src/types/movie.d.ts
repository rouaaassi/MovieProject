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
  
  export interface MovieDetailResponse extends Movie {
    runtime: number;
    genres: { id: number; name: string }[];
    production_companies: { id: number; name: string; logo_path: string | null }[];
    budget: number;
    revenue: number;
  }