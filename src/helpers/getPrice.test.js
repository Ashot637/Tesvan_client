import getPrice from './getPrice';

describe('getPrice function', () => {
  test('formats number with spaces as thousands separators', () => {
    const result = getPrice(15000);
    expect(result).toBe('15 000');
  });

  test('formats number with spaces as thousands separators (larger number)', () => {
    const result = getPrice(150000);
    expect(result).toBe('150 000');
  });

  test('formats number with spaces as million separators', () => {
    const result = getPrice(1500000);
    expect(result).toBe('1 500 000');
  });
});
