import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearDetails, getDetails, loadBookById, selectDetails } from '../features/details/details-slice';

export const useDetails = (id) => {
  const dispatch = useDispatch();
  const details = useSelector(selectDetails);

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

  return details;
};
