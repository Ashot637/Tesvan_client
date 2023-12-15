import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';

export const renderWithRedux = (paths, children) => {
  const component = (
    <MemoryRouter initialEntries={paths}>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );

  return render(component);
};
