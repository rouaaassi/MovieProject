import { MovieList } from "../components/MovieList";
import { motion } from "framer-motion";
import { Movie } from "../types/movie";

interface MovieListSectionProps {
  movies: Movie[];
}

export const MovieListSection: React.FC<MovieListSectionProps> = ({ movies }) => (
  <motion.div className="p-4" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}>
    <MovieList movies={movies} />
  </motion.div>
);
