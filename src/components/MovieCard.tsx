import { useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../types/movie";
import { useFavorites } from "../contexts/FavoritesContext";
import { Button, Typography, Snackbar, Alert } from "@mui/material";
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import StarIcon from '@mui/icons-material/Star';

export const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleAddFavorite = () => {
    addFavorite(movie);
    setSnackbarMessage("Film added successfully");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleRemoveFavorite = () => {
    removeFavorite(movie.id);
    setSnackbarMessage("Film removed successfully");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col pt-4">
      <Link to={`/movie/${movie.id}`} className="flex-grow no-underline">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-80 object-cover"
        />

        <div className="flex items-center gap-2 justify-start p-2">
          <VideoLibraryIcon sx={{ color: 'red' }} />
          <Typography
            variant="body2"
            component="h2"
            sx={{ color: 'black', fontWeight: 'bold' }}
            className="text-lg"
          >
            {movie.title}
          </Typography>
          <StarIcon sx={{ color: 'gold' }} />
        </div>
      </Link>

      <div className="p-2">
        {isFavorite ? (
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleRemoveFavorite}
          >
            Remove
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleAddFavorite}
          >
            Add
          </Button>
        )}
      </div>

      {/* Snackbar component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
