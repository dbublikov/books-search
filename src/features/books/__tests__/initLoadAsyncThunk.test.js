import { initLoad } from '../books-slice';
import axios from 'axios';

// import thunk from 'redux-thunk';
// import configureStore from 'redux-mock-store';

// jest.mock("axios")
// const mockStore = configureStore([thunk]);

describe('initLoad thunk', () => {
  it('should handle initLoad with resolved response', async () => {

    const books = [{
      id: 'osZVEAAAQBAJ',
      volumeInfo: {
        title: 'Start Painting Now',
        subtitle: 'Discover Your Artistic Potential',
        authors: [
          'Emily Powell',
          'Sarah Moore',
        ],
      },
    }];

    // const store = mockStore({});
    // axios.get.mockResolvedValue(
    //   { status: 200, data: books }
    // );

    jest
      .spyOn(axios, 'get')
      .mockResolvedValue({ status: 200, data: books });

    // await store.dispatch(await initLoad());
    // const actionsResulted = store.getActions();

    // console.log(actionsResulted)

    // function fetchTodos() {
    //   return function (dispatch, getState) {}
    // };

    const dispatch = jest.fn();
    const thunk = initLoad();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('@@books/initLoad/pending');
    expect(end[0].type).toBe('@@books/initLoad/fulfilled');
    expect(end[0].payload).toBe(books);
  });

  it('should handle initLoad with rejected response', async () => {

    jest
      .spyOn(axios, 'get')
      .mockResolvedValue({
        isAxiosError: true,
      });

    const dispatch = jest.fn();
    const thunk = initLoad();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe('@@books/initLoad/pending');
    expect(end[0].type).toBe('@@books/initLoad/rejected');
    expect(end[0].meta.rejectedWithValue).toBe(true);
    expect(end[0].payload).toBe('Can\'t fetch');
  });
});

