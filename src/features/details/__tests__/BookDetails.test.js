import { screen, waitFor } from '@testing-library/react';
import { renderWithContext } from '../../../test-utils';

import { BookDetails } from '../BookDetails';
import { detailsData } from '../../../mocks/detailsData';
import * as api from '../../../config';

const getBookSpyDetails = jest.spyOn(api, 'loadDetails');

describe('BookDetails', () => {
  it('should render book details', async () => {
    getBookSpyDetails.mockResolvedValue({ data: detailsData });
    const view = renderWithContext(<BookDetails />);

    expect(screen.getByTestId('spinner')).toBeVisible();
    await waitFor(() => expect(getBookSpyDetails).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/Picasso's War/i)).toBeInTheDocument();
    expect(await screen.findByText(/Hugh Eakin/i)).toBeInTheDocument();
    expect(view).toMatchSnapshot();
  });

  it('should render error message', async () => {
    getBookSpyDetails.mockRejectedValue(new Error('API Error'));
    renderWithContext(<BookDetails />);

    await waitFor(() => expect(getBookSpyDetails).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/Can't fetch the book info/i)).toBeInTheDocument();
  });
});





