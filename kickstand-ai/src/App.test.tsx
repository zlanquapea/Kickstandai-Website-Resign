import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Kickstand AI navbar brand', () => {
  render(<App />);
  const brandLinks = screen.getAllByText(/kickstand ai/i);
  expect(brandLinks.length).toBeGreaterThan(0);
});

test('renders the hero headline', () => {
  render(<App />);
  const headline = screen.getByRole('heading', { level: 1 });
  expect(headline).toHaveTextContent(/built for/i);
});
