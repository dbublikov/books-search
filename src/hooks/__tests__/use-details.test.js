import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import * as api from '../../config';
import store from '../../store';

import { useDetails } from '../use-details';
import { detailsData } from '../../mocks/detailsData';

const getBookSpyDetails = jest.spyOn(api, 'loadDetails');
const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('The use-details hook', () => {
  it('should return error message if the api error', async () => {
    getBookSpyDetails.mockRejectedValue(new Error('API Error'));
    const { result, waitForNextUpdate } = renderHook(() => useDetails(), { wrapper });

    await waitForNextUpdate();

    expect(result.current.error).toBe('API Error');
  });

  it('should return data with a successful api request', async () => {
    getBookSpyDetails.mockResolvedValue({ data: detailsData });
    const { result, waitForNextUpdate } = renderHook(() => useDetails(), { wrapper });

    await waitForNextUpdate();

    expect(result.current.currentBook).toMatchObject(detailsData);
  });
});
