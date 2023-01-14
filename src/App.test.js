import { render, screen } from '@testing-library/react';
import Principal from './pages/Principal';

test('renders learn react link', () => {
  render(<Principal />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
