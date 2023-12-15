import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortBy from './SortBy';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from '../../redux/slices/devicesSlice';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('SortBy Component', () => {
  it('handles click events correctly', async () => {
    const mockDispatch = jest.fn();
    const mockSortType = { label: 'someLabel' };
    const mockSelectedSortType = { label: 'selectedLabel' };
    useSelector.mockReturnValue({
      sortType: mockSortType,
      sortList: [mockSortType, mockSelectedSortType],
    });
    useDispatch.mockReturnValue(mockDispatch);

    render(<SortBy />);

    fireEvent.click(screen.getByText('someLabel'));

    fireEvent.click(await screen.findByText('selectedLabel'));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(setSortType(mockSelectedSortType));
    });
  });
});
