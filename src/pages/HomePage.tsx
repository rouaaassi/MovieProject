import { useState } from 'react';
import { Box } from '@mui/material';
import { SearchBar } from '../components/SearchBar';
import { ErrorAlert } from '../components/ErrorAlert';
import { searchMovies } from '../api/movieApi';
import { Movie } from '../types/movie';
import { IntroSection } from './IntroSection';
import { motion } from "framer-motion";
import backgroundImage from '../assets/photo-1512790182412-b19e6d62bc39.avif';
import { useNavigate } from "react-router-dom";
import { useSearch } from '../App';

// HomePage component - Main page of the application
export const HomePage = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setSearchResults, setSearchQuery, setIsLoading } = useSearch();

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      return;
    }

    setError(null);
    setIsLoading(true);
    setSearchQuery(query);

    try {
      const results = await searchMovies(query);
      setSearchResults(results);
      navigate('/search');
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContact = () => {
    navigate('/contact');
  };

  return (
    <Box>
      <motion.div
        className="h-[100vh] w-full relative flex flex-col text-white"
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
        <div className="relative z-10 flex flex-col flex-grow mt-[20px] min-h-screen">
          <IntroSection onContactClick={handleContact} />
          <SearchBar onSearch={handleSearch} />
          {error && <ErrorAlert error={error} onClose={() => setError(null)} />}
        </div>
      </motion.div>
    </Box>
  );
};
