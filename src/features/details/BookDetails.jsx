import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Info } from './Info';
import { Loader } from '../../components/Loader';
import { clearDetails, getDetails, loadBookById, selectDetails } from './details-slice';

export const BookDetails = ({ id }) => {
  const { status, error, currentBook } = useSelector(selectDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.hasOwnProperty(id)) {
      // console.log('check localStorage!!!')
      dispatch(getDetails(id));
    } else {
      dispatch(loadBookById(id));
    }

    return () => {
      dispatch(clearDetails());
    };
  }, [id, dispatch]);

  return (
    <>
      {status === 'loading' && <Loader pos={true} />}
      {error && <Loader>Can't fetch the book info =(</Loader>}
      {currentBook && <Info id={id} {...currentBook.volumeInfo} />}
    </>
  );
};
