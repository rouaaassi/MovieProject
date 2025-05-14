import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Movie } from "../types/movie";
import { Typography, Snackbar, Alert, Box, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from "framer-motion";

interface MovieCardProps {
  movie: Movie;
  onFavoriteAction?: (movie: Movie) => void;
  isFavorite?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onFavoriteAction, isFavorite = false }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "warning">("success");
  const location = useLocation();
  const isFavoritesPage = location.pathname === '/favorites';

  const handleFavoriteAction = () => {
    if (onFavoriteAction) {
      onFavoriteAction(movie);
      setSnackbarMessage(isFavorite ? "Movie removed from favorites" : "Movie added to favorites");
      setSnackbarSeverity(isFavorite ? "warning" : "success");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          '&:hover': {
            transform: 'scale(1.02)',
            transition: 'transform 0.3s ease-in-out'
          }
        }}
      >
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <CardMedia
            component="img"
            height="400"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            sx={{ 
              objectFit: 'cover',
              '&:hover': {
                opacity: 0.9
              }
            }}
          />
        </Link>

        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <VideoLibraryIcon sx={{ color: 'error.main' }} />
            <Typography
              variant="h6"
              component="h2"
              sx={{ 
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              {movie.title}
            </Typography>
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center', gap: 1 }}>
          {isFavoritesPage ? (
            <Button
              variant="contained"
              color="error"
              onClick={handleFavoriteAction}
              startIcon={<DeleteIcon />}
              sx={{ 
                flex: 1,
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'error.dark'
                }
              }}
            >
              Remove from Favorites
            </Button>
          ) : (
            <Button
              variant="contained"
              color={isFavorite ? "error" : "success"}
              onClick={handleFavoriteAction}
              sx={{ 
                flex: 1,
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: isFavorite ? 'error.dark' : 'success.dark'
                }
              }}
            >
              {isFavorite ? "Remove" : "Add to Favorites"}
            </Button>
          )}
        </CardActions>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ 
            width: '100%',
            backgroundColor: snackbarSeverity === 'success' ? 'success.main' : 'warning.main',
            color: 'white'
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};
