import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders booking form and validates required fields', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /little lemon table booking/i })).toBeInTheDocument();
  const submitButton = screen.getByRole('button', { name: /book table/i });
  fireEvent.click(submitButton);
  expect(screen.getByText(/date is required/i)).toBeInTheDocument();
  expect(screen.getByText(/time is required/i)).toBeInTheDocument();
});
