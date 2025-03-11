import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Favorites } from "./components/Favorites";
import { MoviePage } from "./pages/MoviePage";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { Navbar } from "./components/navbar";
import NotFound from "./components/NotFound";
import { Loader } from "./components/Loader";
import { useEffect, useState } from "react";

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <FavoritesProvider>
    <Router>
      <AppContent />
    </Router>
  </FavoritesProvider>
);

export default App;
