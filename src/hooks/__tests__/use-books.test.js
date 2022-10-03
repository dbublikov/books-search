import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import * as api from '../../config';
import store from '../../store';

import { useBooks } from '../use-books';
import { booksData } from '../../mocks/booksData';

const getBooksSpyInit = jest.spyOn(api, 'initLoad');
const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('The use-books hook', () => {
  it('should return error message if the api error', async () => {
    getBooksSpyInit.mockRejectedValue(new Error('API Error'));
    const { result, waitForNextUpdate } = renderHook(() => useBooks(), { wrapper });

    await waitForNextUpdate();

    const [_, { error }] = result.current;
    expect(error).toBe('API Error');
  });


  it('should return data with a successful api request', async () => {
    getBooksSpyInit.mockResolvedValue({ data: booksData });
    const { result, waitForNextUpdate } = renderHook(() => useBooks(), { wrapper });

    await waitForNextUpdate();

    const [books, _] = result.current;
    expect(books).toHaveLength(3);
  });
});
