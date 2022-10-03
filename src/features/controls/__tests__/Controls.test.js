import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';

import * as api from '../../../config';
import { renderWithContext } from '../../../test-utils';
import { Controls } from '../Controls';

const getBooksSpyLoad = jest.spyOn(api, 'loadBooks');

describe('Controls', () => {
  it('should send search query when submit button clicked', async () => {
    renderWithContext(<Controls />);

    const input = screen.getByLabelText('search_input');
    const button = screen.getByRole('button', { name: 'btn_submit' });
    expect(input).toBeInTheDocument();
    await userEvent.type(input, 'typescript');

    expect(screen.getByTestId('form')).toHaveFormValues({ categories: 'all' });
    await selectEvent.select(screen.getByLabelText('Categories'), 'computers');
    await selectEvent.select(screen.getByLabelText('Sorting by'), 'newest');

    expect(screen.getByTestId('form')).toHaveFormValues({ categories: 'computers', sorting: 'newest' });
    await userEvent.click(button);

    const args = { search: 'typescript', category: 'computers', orderBy: 'newest' };
    await waitFor(() => expect(getBooksSpyLoad).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(getBooksSpyLoad).toHaveBeenCalledWith(args));
  });
});
