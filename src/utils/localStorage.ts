import { Movie } from "../types/movie";

const FAVORITES_KEY = 'favorites';

export const getFavorites = (): Movie[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveFavorites = (favorites: Movie[]): void => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};
