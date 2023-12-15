import { screen, waitFor } from '@testing-library/react';
import { renderWithRedux } from '../../tests/renderWithRedux';
import ItemsSection from './ItemsSection';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';

const SomePage = () => <div data-testid="SomePageMock" />;

describe('ItemsSection', () => {
  test('should navigate to main page', async () => {
    const mockData = [
      {
        id: 1,
        brand: { title: 'Apple' },
        categorie: { title_en: 'Laptops' },
        title: 'Macbook Pro',
        typeId: 1,
        images: ['macbook_pro.jpg'],
        quantity: 10,
        price: 1299.99,
        oldPrice: 1499.99,
      },
    ];
    renderWithRedux(
      ['/'],
      <>
        <ItemsSection items={mockData} link="/some-page" />
        <Routes>
          <Route path="/some-page" element={<SomePage />} />
        </Routes>
      </>,
    );

    const mainLink = screen.getByTestId('itemsSection-mainLink');
    userEvent.click(mainLink);

    await waitFor(() => {
      expect(screen.getByTestId('SomePageMock')).toBeInTheDocument();
    });
  });

  test('should redner without main page button', async () => {
    const mockData = [
      {
        id: 1,
        brand: { title: 'Apple' },
        categorie: { title_en: 'Laptops' },
        title: 'Macbook Pro',
        typeId: 1,
        images: ['macbook_pro.jpg'],
        quantity: 10,
        price: 1299.99,
        oldPrice: 1499.99,
      },
    ];
    renderWithRedux(['/'], <ItemsSection items={mockData} link="/some-page" main />);

    expect(screen.queryByTestId('itemsSection-mainLink')).not.toBeInTheDocument();
  });
});
