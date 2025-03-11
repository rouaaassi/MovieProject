import { FC } from "react";
import { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";
import { Box } from "@mui/material";

export const MovieList: FC<{ movies: Movie[] }> = ({ movies }) => (
  <Box
  sx={{
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
    gap: 2,
    paddingTop:10,
  }}
>
    {movies.map((movie) => (
      <div
        key={movie.id}
        className="w-full md:w-[30%] "
      >
        <MovieCard movie={movie} />
      </div>
    ))}
  </Box>
);
