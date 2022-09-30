import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initLoad, selectBooks, selectBooksInfo } from '../books/books-slice';

import { Card } from '../../components/Card';
import { List } from '../../components/List';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const BooksList = () => {
  const books = useSelector(selectBooks);
  const { status, qty } = useSelector(selectBooksInfo);
  const dispatch = useDispatch();


  useEffect(() => {
    if (!qty) {
      dispatch(initLoad());
    }
  }, [qty, dispatch]);

  return (
    <Wrapper>
      {
        status === 'received' && (
          <List>
            {books.map(({ id, volumeInfo }) => {
              return (
                <Card
                  key={id}
                  id={id}
                  {...volumeInfo}
                />
              );
            })}
          </List>
        )
      }
    </Wrapper>
  );
};
