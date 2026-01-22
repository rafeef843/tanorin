import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Footer';

describe('Footer Component', () => {
  const mockContent = {
    desc: 'Tanorin Description',
    quickLinks: {
      title: 'Quick Links',
      items: ['About Tanorin', 'Our Products', 'Quality Control', 'Global Logistics']
    },
    contact: {
      title: 'Contact Us',
      address: 'Cairo',
      email: 'test@tanorin.com',
      phone: '+123456789'
    },
    newsletter: {
      title: 'Newsletter',
      desc: 'Subscribe now',
      placeholder: 'Enter email'
    },
    copyright: '© 2026 Tanorin',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service'
  };

  it('renders footer content correctly', () => {
    render(
      <MemoryRouter>
        <Footer content={mockContent} lang="en" />
      </MemoryRouter>
    );

    expect(screen.getByText('Tanorin Description')).toBeInTheDocument();
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Cairo')).toBeInTheDocument();
    expect(screen.getByText('test@tanorin.com')).toBeInTheDocument();
  });

  it('renders quick links', () => {
    render(
      <MemoryRouter>
        <Footer content={mockContent} lang="en" />
      </MemoryRouter>
    );

    const link = screen.getByText('About Tanorin');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/about');
  });
});
