import { devicesReducer, fetchDevices, fetchFilters } from './devicesSlice';

const initialState = {
  devices: [],
  page: 1,
  brandIds: [],
  categorieId: 0,
  minPrice: 0,
  maxPrice: 2000000,
  status: 'waiting',
  sortType: {
    label: 'highToLow',
    following: 'DESC',
    name: 'price',
  },
  sortList: [
    {
      label: 'lowToHigh',
      following: 'ASC',
      name: 'price',
    },
    {
      label: 'highToLow',
      following: 'DESC',
      name: 'price',
    },
    {
      label: 'oldest',
      following: 'ASC',
      name: 'id',
    },
    {
      label: 'newest',
      following: 'DESC',
      name: 'id',
    },
  ],
  activeFilters: {},
  filters: [],
  pagination: 0,
};

describe('first', () => {
  describe('async actions', () => {
    describe('fetchDevices', () => {
      test('should handle fetchDevices.pending', () => {
        const newState = devicesReducer(initialState, fetchDevices.pending);

        expect(newState.status).toBe('loading');
      });

      test('should handle fetchDevices.rejected', () => {
        const newState = devicesReducer(initialState, fetchDevices.rejected);

        expect(newState.status).toBe('error');
        expect(newState.devices).toEqual([]);
      });

      test('should handle fetchDevices.fullfiled', () => {
        const payload = {
          result: [
            { id: 1, name: 'Device 1' },
            { id: 2, name: 'Device 2' },
          ],
          pagination: 5,
        };
        const newState = devicesReducer(initialState, fetchDevices.fulfilled(payload));

        expect(newState.status).toBe('success');
        expect(newState.devices).toEqual(payload.result);
        expect(newState.pagination).toEqual(payload.pagination);
      });
    });

    describe('fetchFilters', () => {
      test('should handle fetchFilters.pending', () => {
        const newState = devicesReducer(initialState, fetchFilters.pending);

        expect(newState.status).toBe('loading');
      });

      test('should handle fetchFilters.rejected', () => {
        const newState = devicesReducer(initialState, fetchFilters.rejected);

        expect(newState.status).toBe('error');
        expect(newState.filters).toEqual([]);
      });

      test('should handle fetchFilters.fullfiled', () => {
        const payload = ['filter 1', 'filter 2'];
        const newState = devicesReducer(initialState, fetchFilters.fulfilled(payload));

        expect(newState.filters).toEqual(payload);
      });
    });
  });
});
