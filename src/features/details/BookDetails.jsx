import { Info } from './Info';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDetails, loadBookById, selectDetails } from './details-slice';

export const BookDetails = ({ id, navigate }) => {
  const { currentBook } = useSelector(selectDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.hasOwnProperty(id)) {
      // console.log('check localStorage!!!')
      dispatch(getDetails(id));
    } else {
      dispatch(loadBookById(id));
    }
  }, [id, dispatch]);

  return (
    <>
      {currentBook && <Info id={id} {...currentBook.volumeInfo} />}
    </>
  );
};
