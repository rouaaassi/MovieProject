import { FC } from "react";
import { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";
import { Box } from "@mui/material";

interface MovieListProps {
  movies: Movie[];
  onFavoriteAction?: (movie: Movie) => void;
  favorites?: Movie[];
}

export const MovieList: FC<MovieListProps> = ({ movies, onFavoriteAction, favorites }) => (
  <Box
    sx={{
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
      gap: 2,
      paddingTop: 10,
    }}
  >
    {movies.map((movie) => (
      <div
        key={movie.id}
        className="w-full md:w-[30%]"
      >
        <MovieCard 
          movie={movie} 
          onFavoriteAction={onFavoriteAction}
          isFavorite={favorites?.some(fav => fav.id === movie.id)}
        />
      </div>
    ))}
  </Box>
);
