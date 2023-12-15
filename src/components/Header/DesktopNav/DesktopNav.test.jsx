import { screen, waitFor } from '@testing-library/react';
import { renderTestApp } from '../../../tests/renderTestApp';
import userEvent from '@testing-library/user-event';

jest.mock('../../../pages/HomePage', () => ({
  __esModule: true,
  default: () => <div data-testid="HomePageMock" />,
}));

jest.mock('../../../pages/CategoriesPage', () => ({
  __esModule: true,
  default: () => <div data-testid="CategoriesPageMock" />,
}));

jest.mock('../../../pages/AboutUsPage', () => ({
  __esModule: true,
  default: () => <div data-testid="AboutUsPageMock" />,
}));

jest.mock('../../../pages/CreditTermsPage', () => ({
  __esModule: true,
  default: () => <div data-testid="CreditTermsPageMock" />,
}));

jest.mock('../../../pages/ContactsPage', () => ({
  __esModule: true,
  default: () => <div data-testid="ContactsPageMock" />,
}));

describe('DesktopNav', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('should navigate to categories page', async () => {
    renderTestApp(['/']);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.queryByTestId('CategoriesPageMock')).not.toBeInTheDocument();

    const link = await screen.findByTestId('nav-categories');

    userEvent.click(link);

    await waitFor(() => {
      expect(screen.getByTestId('CategoriesPageMock')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('HomePageMock')).not.toBeInTheDocument();
  });

  test('should navigate to about us page', async () => {
    renderTestApp(['/']);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.queryByTestId('AboutUsPageMock')).not.toBeInTheDocument();

    const link = await screen.findByTestId('nav-aboutUs');

    userEvent.click(link);

    await waitFor(() => {
      expect(screen.getByTestId('AboutUsPageMock')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('HomePageMock')).not.toBeInTheDocument();
  });

  test('should navigate to credit terms page', async () => {
    renderTestApp(['/']);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.queryByTestId('CreditTermsPageMock')).not.toBeInTheDocument();

    const link = await screen.findByTestId('nav-creditTerms');

    userEvent.click(link);

    await waitFor(() => {
      expect(screen.getByTestId('CreditTermsPageMock')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('HomePageMock')).not.toBeInTheDocument();
  });

  test('should navigate to contacts page', async () => {
    renderTestApp(['/']);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.queryByTestId('ContactsPageMock')).not.toBeInTheDocument();

    const link = await screen.findByTestId('nav-contacts');

    userEvent.click(link);

    await waitFor(() => {
      expect(screen.getByTestId('ContactsPageMock')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('HomePageMock')).not.toBeInTheDocument();
  });

  test('should navigate to home page', async () => {
    renderTestApp(['/categories']);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.queryByTestId('HomePageMock')).not.toBeInTheDocument();

    const link = await screen.findByTestId('header-logo');

    userEvent.click(link);

    await waitFor(() => {
      expect(screen.getByTestId('HomePageMock')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('CategoriesPageMock')).not.toBeInTheDocument();
  });
});
