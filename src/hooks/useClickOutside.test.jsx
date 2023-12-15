import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useClickOutside from './useClickOutside';

describe('useClickOutside', () => {
  it('should close when clicking outside the element', () => {
    function TestComponent() {
      const [ref, isShow, setIsShow] = useClickOutside();

      return (
        <div ref={ref}>
          <button onClick={() => setIsShow(!isShow)}>Toggle</button>
          {isShow && <div>Content</div>}
        </div>
      );
    }

    render(<TestComponent />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.click(screen.getByText('Toggle'));
    });

    expect(screen.getByText('Content')).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.click(document.body);
    });

    expect(screen.queryByText('Content')).toBeNull();
  });
});
