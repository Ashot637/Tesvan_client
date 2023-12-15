import { screen, waitFor } from '@testing-library/react';
import useSWR from 'swr';
import TypedItems from './TypedItems';
import { renderWithRedux } from '../../tests/renderWithRedux';

jest.mock('swr');

describe('TypedItems', () => {
  test('should redner ItemsSection with cards', async () => {
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
      {
        id: 2,
        brand: { title: 'Samsung' },
        categorie: { title_en: 'Smartphones' },
        title: 'Galaxy S21',
        typeId: 2,
        images: ['galaxy_s21.jpg'],
        quantity: 15,
        price: 899.99,
        oldPrice: 999.99,
      },
      {
        id: 3,
        brand: { title: 'Sony' },
        categorie: { title_en: 'Headphones' },
        title: 'WH-1000XM4',
        typeId: 3,
        images: ['wh_1000xm4.jpg'],
        quantity: 5,
        price: 349.99,
        oldPrice: 399.99,
      },
      {
        id: 4,
        brand: { title: 'Dell' },
        categorie: { title_en: 'Desktops' },
        title: 'XPS 8930',
        typeId: 1,
        images: ['xps_8930.jpg'],
        quantity: 8,
        price: 1499.99,
        oldPrice: 1699.99,
      },
      {
        id: 5,
        brand: { title: 'LG' },
        categorie: { title_en: 'Monitors' },
        title: '27GL83A-B',
        typeId: 2,
        images: ['27gl83a_b.jpg'],
        quantity: 12,
        price: 499.99,
        oldPrice: 549.99,
      },
    ];

    useSWR.mockReturnValue({
      data: mockData,
    });

    renderWithRedux(['/'], <TypedItems />);

    const cards = await screen.findAllByTestId('card');

    expect(cards.length).toBe(mockData.length);
  });

  test('should redner ItemsSection without cards', async () => {
    const mockData = [];

    useSWR.mockReturnValue({
      data: mockData,
    });

    renderWithRedux(['/'], <TypedItems />);

    await waitFor(() => {
      const cards = screen.queryAllByTestId('card');
      expect(cards.length).toBe(mockData.length);
    });
  });
});
