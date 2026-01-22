import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';

describe('Header Component', () => {
  const mockContent = {
    home: 'Home',
    about: 'About',
    products: 'Products',
    quality: 'Quality',
    exhibitions: 'Exhibitions',
    news: 'News',
    langSwitch: 'EN'
  };

  const mockToggle = vi.fn();

  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Header content={mockContent} lang="en" toggleLanguage={mockToggle} />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('calls toggleLanguage when switch is clicked', () => {
    render(
      <MemoryRouter>
        <Header content={mockContent} lang="en" toggleLanguage={mockToggle} />
      </MemoryRouter>
    );

    const switchBtn = screen.getByText(mockContent.langSwitch).closest('div');
    fireEvent.click(switchBtn);
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});
