/* eslint-disable testing-library/no-unnecessary-act */
import { fireEvent, screen } from '@testing-library/react';
import Header from './Header';
import { renderWithRedux } from '../../tests/renderWithRedux';
import { act } from 'react-dom/test-utils';

describe('Header', () => {
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

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should change styles when scrolling', () => {
    renderWithRedux(['/'], <Header />);

    const header = screen.getByTestId('header');

    expect(header.classList).not.toContain('scrolling');

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(header.classList).toContain('scrolling');
  });

  test('open and close by buttons', () => {
    renderWithRedux(['/'], <Header />);

    expect(screen.queryByTestId('cart')).toBeNull();
    const openBtn = screen.getByTestId('header-openCartButton');

    act(() => {
      fireEvent.click(openBtn);
    });

    expect(screen.getByTestId('cart')).toBeInTheDocument();

    const closeBtn = screen.getByTestId('cart-closeCartButton');

    act(() => {
      fireEvent.click(closeBtn);
    });

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(screen.queryByTestId('cart')).toBeNull();
  });

  test('open by button and close by clicking outside', () => {
    renderWithRedux(['/'], <Header />);

    expect(screen.queryByTestId('cart')).toBeNull();
    const openBtn = screen.getByTestId('header-openCartButton');

    act(() => {
      fireEvent.click(openBtn);
    });

    expect(screen.getByTestId('cart')).toBeInTheDocument();

    const closeBtn = screen.getByTestId('cart-closeCartByClickingOutside');

    act(() => {
      fireEvent.click(closeBtn);
    });

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(screen.queryByTestId('cart')).toBeNull();
  });

  test('open and close by same open button', () => {
    renderWithRedux(['/'], <Header />);

    expect(screen.queryByTestId('cart')).toBeNull();
    const openBtn = screen.getByTestId('header-openCartButton');

    act(() => {
      fireEvent.click(openBtn);
    });

    expect(screen.getByTestId('cart')).toBeInTheDocument();

    act(() => {
      fireEvent.click(openBtn);
    });

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(screen.queryByTestId('cart')).toBeNull();
  });
});
