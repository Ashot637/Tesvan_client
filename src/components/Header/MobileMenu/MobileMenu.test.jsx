/* eslint-disable testing-library/no-unnecessary-act */
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MobileMenu from './MobileMenu';
import { renderWithRedux } from '../../../tests/renderWithRedux';

describe('MobileMenu', () => {
  test('should open menu on button click', async () => {
    renderWithRedux(['/'], <MobileMenu />);
    expect(screen.queryByTestId('mobileMenu-menu')).toBeNull();
    const btn = screen.getByTestId('mobileMenu-btn');

    act(() => {
      userEvent.click(btn);
    });

    expect(await screen.findByTestId('mobileMenu-menu')).toBeInTheDocument();

    act(() => {
      userEvent.click(document.body);
    });

    expect(screen.queryByTestId('mobileMenu-menu')).toBeNull();
  });
});
