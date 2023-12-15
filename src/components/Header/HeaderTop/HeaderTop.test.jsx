/* eslint-disable testing-library/no-unnecessary-act */
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeaderTop from './HeaderTop';
import { renderWithRedux } from '../../../tests/renderWithRedux';

describe('HeaderTop', () => {
  test('should open popup on button click', async () => {
    renderWithRedux(['/'], <HeaderTop />);
    expect(screen.queryByTestId('headerTop-menu')).toBeNull();
    const btn = screen.getByTestId('headerTop-btn');

    act(() => {
      userEvent.click(btn);
    });

    expect(await screen.findByTestId('headerTop-menu')).toBeInTheDocument();

    act(() => {
      userEvent.click(document.body);
    });

    expect(screen.queryByTestId('headerTop-menu')).toBeNull();
  });

  test('language should change when clicking', async () => {
    renderWithRedux(['/'], <HeaderTop />);
    let languageDiv = await screen.findByTestId('headerTop-language');
    expect(languageDiv).toBeInTheDocument();
    expect(languageDiv).not.toHaveTextContent('English');

    const btn = screen.getByTestId('headerTop-btn');

    act(() => {
      userEvent.click(btn);
    });

    const changeToEnglishBtn = screen.getByTestId('headerTop-english');

    act(() => {
      userEvent.click(changeToEnglishBtn);
    });

    languageDiv = await screen.findByTestId('headerTop-language');
    expect(languageDiv).toHaveTextContent('English');
  });
});
