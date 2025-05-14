import { FC, useState, KeyboardEvent } from "react";
import { TextField, Button, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  onSearch: (query: string) => void;
}

export const SearchBar: FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={2} gap={1}>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search Movies..."
        variant="outlined"
        size="small"
        sx={{
          width: '50%',
          backgroundColor: 'white',
          borderRadius: '4px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'error.main',
            },
          },
        }}
      />

      <Button
        variant="contained"
        color="error"
        onClick={handleSearch}
        startIcon={<SearchIcon />}
        sx={{ 
          textTransform: 'none', 
          color: 'white',
          '&:hover': {
            backgroundColor: 'error.dark',
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};
