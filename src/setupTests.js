import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getLatestAntihoax } from 'src/views/public/factcheck/store/action'; // Update path to your actions
import { GET_DATA_FACT_CHECK } from '../actionTypes';
import { api } from 'utility'; // Mock this if necessary

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getLatestAntihoax', () => {
  it('should dispatch GET_DATA_FACT_CHECK with correct data', () => {
    const store = mockStore({});
    const mockData = { data: [], total: 0 };

    // Mock API request
    api.request = jest.fn(() =>
      Promise.resolve({
        data: mockData,
        success: true
      })
    );

    return store.dispatch(getLatestAntihoax()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: GET_DATA_FACT_CHECK,
        data: {
          data: mockData.data,
          total: mockData.total
        }
      });
    });
  });
});
