import { render, screen } from '@testing-library/react';
import { MovieCard } from '../components/MovieCard';
import { FavoritesProvider } from '../contexts/FavoritesContext';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test.jpg',
  overview: 'Test overview',
  release_date: '2022-01-01',
  vote_average: 8.5,
};

test('renders movie card with title', () => {
  render(
    <FavoritesProvider>
      <MovieCard movie={mockMovie} />
    </FavoritesProvider>
  );

  expect(screen.getByText(/test movie/i)).toBeInTheDocument();
});
