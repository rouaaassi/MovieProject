import { useEffect, useState } from "react";
import { getMovieDetails } from "../api/movieApi";
import { useParams } from "react-router-dom";
import { Movie } from "../types/movie";

export const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(Number(id));
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details", error);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  if (!movie) return <p className="text-center p-4 text-white">Loading...</p>;

  return (
    <div
      className="min-h-screen flex justify-center items-center p-8"
      style={{
        background: "radial-gradient(circle at top left, rgb(54, 28, 28), #000000)",
        color: "white",
      }}
    >
      <div className="flex flex-col md:flex-row gap-10 max-w-6xl w-full items-center md:items-start">
        <div className="w-full md:w-[40%] flex justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg w-full h-auto max-w-[400px] object-cover"
          />
        </div>

        <div className="w-full md:w-[60%] flex flex-col gap-5">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-lg leading-relaxed">{movie.overview}</p>
          <p>
            <span className="font-semibold">Release Date:</span> {movie.release_date}
          </p>
          <p className="text-lg font-semibold flex items-center gap-2">
            Rating: {movie.vote_average}
            <span className="text-yellow-400 text-xl">⭐</span>
          </p>
        </div>
      </div>
    </div>
  );
};
