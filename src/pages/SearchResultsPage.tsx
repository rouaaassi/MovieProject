import { Box, Typography, CircularProgress } from '@mui/material';
import { MovieListSection } from './MovieListSection';
import { motion } from "framer-motion";
import backgroundImage from '../assets/photo-1512790182412-b19e6d62bc39.avif';
import { useSearch } from '../App';
import { useFavorites } from '../contexts/FavoritesContext';
import { Movie } from '../types/movie';
import { Snackbar, Alert } from '@mui/material';
import { useState } from 'react';

export const SearchResultsPage = () => {
  const { searchResults, searchQuery, isLoading } = useSearch();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "warning">("success");

  const handleFavoriteAction = (movie: Movie) => {
    const isFavorite = favorites.some(fav => fav.id === movie.id);
    
    if (isFavorite) {
      removeFavorite(movie.id);
      setSnackbarMessage("Movie removed from favorites");
      setSnackbarSeverity("warning");
    } else {
      addFavorite(movie);
      setSnackbarMessage("Movie added to favorites");
      setSnackbarSeverity("success");
    }
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <motion.div
        className="min-h-screen w-full relative flex flex-col text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
        <div className="relative z-10 flex flex-col flex-grow mt-[100px] min-h-screen p-8">
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'white',
              textAlign: 'center',
              mb: 4,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            Search Results: {searchQuery}
          </Typography>

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress sx={{ color: 'white' }} />
            </Box>
          ) : searchResults.length > 0 ? (
            <MovieListSection 
              movies={searchResults} 
              onFavoriteAction={handleFavoriteAction}
              favorites={favorites}
            />
          ) : (
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white',
                textAlign: 'center',
                mt: 4
              }}
            >
              No results found
            </Typography>
          )}
        </div>
      </motion.div>

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
    </Box>
  );
}; 