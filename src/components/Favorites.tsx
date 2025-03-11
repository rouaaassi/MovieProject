import { Box, Typography, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useFavorites } from "../contexts/FavoritesContext";
import { MovieCard } from "./MovieCard";
import { useState } from "react";

export const Favorites = () => {
  const { favorites } = useFavorites();

  const [filterType, setFilterType] = useState<string>("title");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortType, setSortType] = useState<string>("");

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
    <Box
      sx={{
        width: '100%',
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        background: "radial-gradient(circle at top left, rgb(54, 28, 28), #000000)",
        minHeight: '100vh'
      }}
    >
      <Typography variant="h4" fontWeight="bold" textAlign="center" color="white">
        Your Favorite Films
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel sx={{ color: "white" }}>Filter by</InputLabel>
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            label="Filter by"
            sx={{ color: "white", borderColor: "white" }}
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
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "gray" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
            minWidth: 250
          }}
        />

        {/* ترتيب */}
        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel sx={{ color: "white" }}>Sort by</InputLabel>
          <Select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            label="Sort by"
            sx={{ color: "white", borderColor: "white" }}
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

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 4,
        }}
      >
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <Typography variant="body1" textAlign="center" sx={{ gridColumn: '1 / -1', color: "white" }}>
            No favorite movies found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
