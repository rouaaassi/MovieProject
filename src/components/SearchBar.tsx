import { FC, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  onSearch: (query: string) => void;
}

export const SearchBar:FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={2} gap={1}>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Movies..."
        variant="outlined"
        size="small"
        sx={{
          width: '50%',
          backgroundColor: 'white',
          borderRadius: '4px',
        }}
      />

      <Button
        variant="contained"
        color="error"
        onClick={() => onSearch(query)}
        startIcon={<SearchIcon />}
        sx={{ textTransform: 'none', color: 'white' }}
      >
        Search
      </Button>
    </Box>
  );
};
