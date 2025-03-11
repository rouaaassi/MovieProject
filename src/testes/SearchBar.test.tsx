import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../components/SearchBar';

describe('SearchBar', () => {
  it('renders input and button', () => {
    render(<SearchBar onSearch={jest.fn()} />);

    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch with input value on submit', () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />); 

    const input = screen.getByPlaceholderText('Search movies...'); 
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Batman' } });

    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('Batman');
  });
});
