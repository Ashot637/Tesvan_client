import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../components/App/App';
import store from '../redux/store';

export const renderTestApp = (paths, children, history) => {
  const component = (
    <MemoryRouter initialEntries={paths} history={history}>
      <Provider store={store}>
        <App />
        {children}
      </Provider>
    </MemoryRouter>
  );

  return render(component);
};
