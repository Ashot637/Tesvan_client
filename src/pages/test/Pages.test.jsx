import { screen, waitFor } from '@testing-library/react';
import { renderTestApp } from '../../tests/renderTestApp';

jest.mock('../HomePage', () => ({
  __esModule: true,
  default: () => <div data-testid="HomePageMock" />,
}));

jest.mock('../CategoriesPage', () => ({
  __esModule: true,
  default: () => <div data-testid="CategoriesPageMock" />,
}));

jest.mock('../AboutUsPage', () => ({
  __esModule: true,
  default: () => <div data-testid="AboutUsPageMock" />,
}));

jest.mock('../ContactsPage', () => ({
  __esModule: true,
  default: () => <div data-testid="ContactsPageMock" />,
}));

jest.mock('../ComparePage', () => ({
  __esModule: true,
  default: () => <div data-testid="ComparePageMock" />,
}));

jest.mock('../CreditTermsPage', () => ({
  __esModule: true,
  default: () => <div data-testid="CreditTermsPageMock" />,
}));

jest.mock('../DevicesPage', () => ({
  __esModule: true,
  default: () => <div data-testid="DevicesPageMock" />,
}));

jest.mock('../ItemsMainPage', () => ({
  __esModule: true,
  default: () => <div data-testid="ItemsMainPageMock" />,
}));

jest.mock('../OrderPage', () => ({
  __esModule: true,
  default: () => <div data-testid="OrderPageMock" />,
}));

jest.mock('../PrivacyPolicyPage', () => ({
  __esModule: true,
  default: () => <div data-testid="PrivacyPolicyPageMock" />,
}));

jest.mock('../ThanksPage', () => ({
  __esModule: true,
  default: () => <div data-testid="ThanksPageMock" />,
}));

jest.mock('../404', () => ({
  __esModule: true,
  default: () => <div data-testid="NotFoundPageMock" />,
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

  test('should render page header and HomePage on default route', async () => {
    renderTestApp(['/']);
    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
    expect(screen.getByTestId('HomePageMock')).toBeInTheDocument();
  });

  test('should render page header and CategoriesPage for categories route', async () => {
    renderTestApp(['/categories']);
    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
    expect(screen.getByTestId('CategoriesPageMock')).toBeInTheDocument();
  });

  test('should render page header and AboutUsPage for about us route', async () => {
    renderTestApp(['/about-us']);
    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
    expect(screen.getByTestId('AboutUsPageMock')).toBeInTheDocument();
  });

  test('should render page header and ContactsPage for contacts route', async () => {
    renderTestApp(['/contacts']);
    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
    expect(screen.getByTestId('ContactsPageMock')).toBeInTheDocument();
  });

  test('should render page header and ComparePage for compare route', async () => {
    renderTestApp(['/compare']);
    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
    expect(screen.getByTestId('ComparePageMock')).toBeInTheDocument();
  });

  test('should render page header and CreditTermsPage for credit terms route', async () => {
    renderTestApp(['/credit-terms']);
    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
    expect(screen.getByTestId('CreditTermsPageMock')).toBeInTheDocument();
  });

  test('should render page header and DevicesPage for devices route', async () => {
    renderTestApp(['/categories/notebooks']);
    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
    expect(screen.getByTestId('DevicesPageMock')).toBeInTheDocument();
  });

  test('should render page header and ItemsMainPage for items main page route', async () => {
    renderTestApp(['/sale']);
    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
    expect(screen.getByTestId('ItemsMainPageMock')).toBeInTheDocument();
  });

  test('should render page header and OrderPage for order route', async () => {
    renderTestApp(['/categories/notebooks/1/make-order']);
    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
    expect(screen.getByTestId('OrderPageMock')).toBeInTheDocument();
  });

  test('should render page header and PrivacyPolicyPage for privacy policy route', async () => {
    renderTestApp(['/privacy-policy']);
    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
    expect(screen.getByTestId('PrivacyPolicyPageMock')).toBeInTheDocument();
  });

  test('should render page header and ThanksPage for thanks route', async () => {
    renderTestApp(['/thanks']);
    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
    expect(screen.getByTestId('ThanksPageMock')).toBeInTheDocument();
  });

  test('should render page header and Not found page for invalid route', async () => {
    renderTestApp(['/invalid-route']);
    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
    expect(screen.getByTestId('NotFoundPageMock')).toBeInTheDocument();
  });
});
