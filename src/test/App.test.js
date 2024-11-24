import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders gift card heading', () => {
  render(<App />);
  expect(screen.getByText(/Gift Card/i)).toBeInTheDocument();
});
