import { useState } from "react"; // React hook to manage component state
import { searchMovies } from "../api/movieApi"; // Function to call movie search API
import { Movie } from "../types/movie"; // Movie type definition
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation
import { motion } from "framer-motion"; // Library for animations
import backgroundImage from '../assets/photo-1512790182412-b19e6d62bc39.avif'; // Background image

// Import custom components used in this page
import { ErrorAlert } from "../components/ErrorAlert"; // Error message alert component
import { IntroSection } from "./IntroSection"; // Initial introduction section
import { MovieListSection } from "./MovieListSection"; // Section to display movies list
import { SearchBarSection } from "./SearchBarSection"; // Search bar component

// HomePage component - Main page of the application
export const HomePage = () => {
  // State to hold list of fetched movies
  const [movies, setMovies] = useState<Movie[]>([]);
  
  // State to hold error message if fetching fails or no results found
  const [error, setError] = useState<string | null>(null);

  // Hook to navigate to other routes (e.g., contact page)
  const navigate = useNavigate();

  // Function to handle searching movies by query
  const handleSearch = async (query: string) => {
    try {
      // Call the API to search for movies with the given query
      const results = await searchMovies(query);
      
      // If no movies found, set an error message
      if (results.length === 0) {
        setError("No movies found. Please try a different search term.");
      } else {
        setError(null); // Clear any previous errors
      }
      
      // Update the movies state with fetched results
      setMovies(results);
    } catch (error) {
      // Set an error message if API call fails
      setError("Failed to fetch movies. Please check your internet connection.");
    }
  };

  // Function to handle "Contact Us" button click
  const handleContact = () => {
    navigate("/contact"); // Navigate to the contact page
  };

  // Animation configuration for fade-in effect using framer-motion
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2 } }, // 2-second fade-in animation
  };

  return (
    // Main container with full screen height and background image
    <motion.div
      className="h-[100vh] w-full relative flex flex-col text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Set background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      initial="hidden" // Initial animation state
      animate="visible" // Final animation state
      variants={fadeIn} // Apply fade-in animation
    >
      {/* Main content container with higher z-index to be above background */}
      <div className="relative z-10 flex flex-col flex-grow mt-[20px]">
        
        {/* Display error alert if an error exists */}
        <ErrorAlert error={error} onClose={() => setError(null)} />
        
        {/* Conditionally render MovieListSection if movies exist, otherwise show IntroSection */}
        {movies.length > 0 ? (
          <MovieListSection movies={movies} /> // List of movies
        ) : (
          <IntroSection onContactClick={handleContact} /> // Intro section with contact button
        )}

        {/* Search bar component to perform movie search */}
        <SearchBarSection onSearch={handleSearch} />
      </div>
    </motion.div>
  );
};
