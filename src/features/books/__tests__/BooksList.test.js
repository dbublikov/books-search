import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithContext, getPreloadedState } from '../../../test-utils';
import { BooksList } from '../BooksList';
import { booksData, extraBooksData } from '../../../mocks/booksData';
import * as api from '../../../config';

const getBooksSpyInit = jest.spyOn(api, 'initLoad');
const getBooksSpyLoad = jest.spyOn(api, 'loadBooks');

describe('BooksList', () => {
  it('should list several books initially', async () => {
    getBooksSpyInit.mockResolvedValue({ data: booksData });
    const view = renderWithContext(<BooksList />);

    await waitFor(() => expect(getBooksSpyInit).toHaveBeenCalledTimes(1));
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(3);
    expect(view).toMatchSnapshot();
  });

  it('should load more books when button clicked', async () => {
    getBooksSpyInit.mockResolvedValue({ data: booksData });
    getBooksSpyLoad.mockResolvedValue({ data: extraBooksData });

    const state = getPreloadedState();
    const view = renderWithContext(<BooksList />, state);
    // const {debug, store} = renderWithContext(<BooksList />, state)
    // debug()
    // console.log(store.getState())

    const button = await screen.findByRole('button', { name: /Load more/i });
    expect(button).toBeInTheDocument();
    expect(view).toMatchSnapshot();

    userEvent.click(button);
    expect(screen.getByTestId('spinner')).toBeVisible();
    await waitFor(() => expect(getBooksSpyLoad).toHaveBeenCalledTimes(1));

    expect(screen.getAllByRole('article')).toHaveLength(6);
  });
});





