import { fetchBrands, brandsReducer } from './brandSlice';

describe('brands slice', () => {
  test('should handle fetchBrands.pending', () => {
    const initialState = { brands: [], status: 'waiting' };
    const newState = brandsReducer(initialState, fetchBrands.pending);

    expect(newState.status).toEqual('loading');
    expect(newState.brands).toEqual([]);
  });

  test('should handle fetchBrands.rejected', () => {
    const initialState = { brands: [], status: 'waiting' };
    const newState = brandsReducer(initialState, fetchBrands.rejected);

    expect(newState.status).toEqual('error');
    expect(newState.brands).toEqual([]);
  });

  test('should handle fetchBrands.fulfilled', () => {
    const initialState = { brands: [], status: 'waiting' };
    const payload = ['brand1', 'brand2'];
    const newState = brandsReducer(initialState, fetchBrands.fulfilled(payload));

    expect(newState.status).toEqual('success');
    expect(newState.brands).toEqual(payload);
  });
});
