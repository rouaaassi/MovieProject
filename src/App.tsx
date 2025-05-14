import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Favorites } from "./components/Favorites";
import { MoviePage } from "./pages/MoviePage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { Navbar } from "./components/navbar";
import NotFound from "./components/NotFound";
import { Loader } from "./components/Loader";
import { useEffect, useState, createContext, useContext } from "react";
import { Movie } from "./types/movie";

interface SearchContextType {
  searchResults: Movie[];
  setSearchResults: (movies: Movie[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const SearchContext = createContext<SearchContextType>({} as SearchContextType);

export const useSearch = () => useContext(SearchContext);

const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SearchContext.Provider value={{ 
      searchResults, 
      setSearchResults, 
      searchQuery, 
      setSearchQuery,
      isLoading,
      setIsLoading
    }}>
      {children}
    </SearchContext.Provider>
  );
};

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer); 
  }, [location]);

  return (
    <>
      {loading && <Loader />} 
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <FavoritesProvider>
        <SearchProvider>
          <AppContent />
        </SearchProvider>
      </FavoritesProvider>
    </Router>
  );
};

export default App;
