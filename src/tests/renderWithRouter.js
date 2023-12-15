import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../components/App/App';

export const rednerWithRouter = (paths, children) => {
  const component = (
    <MemoryRouter initialEntries={paths}>
      <App />
      {children}
    </MemoryRouter>
  );

  return render(component);
};
