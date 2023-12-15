import { render, screen, waitFor } from '@testing-library/react';
import Slider from './Slider';
import { MemoryRouter } from 'react-router-dom';
import useSWR from 'swr';

jest.mock('swr');

describe('Slider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render slides', async () => {
    const mockData = [
      {
        id: 1,
        title: 'Test Title 1',
        img: 'test-img-1.jpg',
        device: {
          id: 1,
          categorie: {
            title_en: 'test-category-1',
          },
        },
      },
      {
        id: 2,
        title: 'Test Title 2',
        img: 'test-img-2.jpg',
        device: {
          id: 2,
          categorie: {
            title_en: 'test-category-2',
          },
        },
      },
    ];

    useSWR.mockReturnValue({
      data: mockData,
      error: null,
      isValidating: false,
    });

    render(
      <MemoryRouter>
        <Slider />
      </MemoryRouter>,
    );

    const slides = await screen.findAllByTestId('slider-slide');
    expect(slides.length).toBe(mockData.length);
    expect(screen.getByText(/Test Title 1/i)).toBeInTheDocument();
  });

  test('should not render slides', async () => {
    const mockData = [];

    useSWR.mockReturnValue({
      data: mockData,
      error: null,
      isValidating: false,
    });

    render(
      <MemoryRouter>
        <Slider />
      </MemoryRouter>,
    );

    await waitFor(() => {
      const slides = screen.queryAllByTestId('slider-slide');
      expect(slides.length).toBe(0);
    });
  });
});
