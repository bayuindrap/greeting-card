import { render, fireEvent, screen } from '@testing-library/react';
import GreetingCard from '../pages/Greeting';

test('shows error alert on empty form submission', () => {
  render(<GreetingCard />);
  
  fireEvent.click(screen.getByText('Download Card'));
  
  expect(screen.getByText('All fields and image upload are required.')).toBeInTheDocument();
});
