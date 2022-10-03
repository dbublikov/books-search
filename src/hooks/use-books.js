import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearControls } from '../features/controls/controls-slice';
import { initLoad, selectBooks, selectBooksInfo } from '../features/books/books-slice';

export const useBooks = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const { status, error, qty, pagination } = useSelector(selectBooksInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(initLoad());
    }

    return () => {
      dispatch(clearControls());
    };
  }, [qty, dispatch]);

  return [books, { status, error, qty, pagination }];
};
