import { Box, Typography, TextField, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert, Grid } from "@mui/material";
import { useFavorites } from "../contexts/FavoritesContext";
import { MovieCard } from "./MovieCard";
import { useState } from "react";
import { motion } from "framer-motion";
import backgroundImage from '../assets/photo-1512790182412-b19e6d62bc39.avif';
import { Movie } from "../types/movie";

export const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  const [filterType, setFilterType] = useState<string>("title");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortType, setSortType] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "warning">("success");

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleFavoriteAction = (movie: Movie) => {
    removeFavorite(movie.id);
    setSnackbarMessage("Movie removed from favorites");
    setSnackbarSeverity("warning");
    setSnackbarOpen(true);
  };

  const filteredFavorites = favorites
    .filter((movie) => {
      const valueToCompare =
        filterType === "title"
          ? movie.title.toLowerCase()
          : filterType === "release_date"
          ? movie.release_date
          : filterType === "rating"
          ? movie.vote_average.toString()
          : "";

      return valueToCompare.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (sortType === "title_asc") return a.title.localeCompare(b.title);
      if (sortType === "title_desc") return b.title.localeCompare(a.title);
      if (sortType === "date_newest") return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      if (sortType === "date_oldest") return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
      if (sortType === "rating_highest") return b.vote_average - a.vote_average;
      if (sortType === "rating_lowest") return a.vote_average - b.vote_average;
      return 0;
    });

  return (
    <motion.div
      className="min-h-screen w-full relative flex flex-col text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: '#000000',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Box
        sx={{
          width: '100%',
          padding: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2, 
            flexWrap: 'wrap',
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            padding: 3,
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            mt: 8
          }}
        >
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel sx={{ color: "white" }}>Filter by</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Filter by"
              sx={{
                color: "white",
                borderColor: "white",
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '& .MuiSvgIcon-root': {
                  color: 'white',
                }
              }}
            >
              <MenuItem value="title">Name</MenuItem>
              <MenuItem value="release_date">Release Date</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            size="small"
            placeholder={`Search by ${filterType === "title" ? "name" : filterType === "release_date" ? "release date" : "rating"}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              minWidth: 250,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.5)',
                opacity: 1,
              }
            }}
          />

          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel sx={{ color: "white" }}>Sort by</InputLabel>
            <Select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              label="Sort by"
              sx={{
                color: "white",
                borderColor: "white",
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '& .MuiSvgIcon-root': {
                  color: 'white',
                }
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="title_asc">Name (A-Z)</MenuItem>
              <MenuItem value="title_desc">Name (Z-A)</MenuItem>
              <MenuItem value="date_newest">Newest Release</MenuItem>
              <MenuItem value="date_oldest">Oldest Release</MenuItem>
              <MenuItem value="rating_highest">Highest Rating</MenuItem>
              <MenuItem value="rating_lowest">Lowest Rating</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Typography 
          variant="h4" 
          fontWeight="bold" 
          textAlign="center" 
          sx={{ 
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            mb: 4
          }}
        >
          Your Favorite Films
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {filteredFavorites.length > 0 ? (
            filteredFavorites.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieCard 
                  movie={movie} 
                  onFavoriteAction={handleFavoriteAction}
                  isFavorite={true}
                />
              </Grid>
            ))
          ) : (
            <Typography 
              variant="h6" 
              textAlign="center" 
              sx={{ 
                color: 'white',
                opacity: 0.7,
                mt: 4
              }}
            >
              No favorite movies found
            </Typography>
          )}
        </Grid>
      </Box>

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
