import HomePage from '@/app/(nav)/home/page';
import { render, screen } from '@testing-library/react';

describe('homepage', () => {
  it('should render', () => {
    render(<HomePage />);

    // const myElement = screen.getByRole('article');
    // expect(myElement).toBeInTheDocument();
  });
});
