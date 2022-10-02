import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearControls } from '../controls/controls-slice';
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!qty) {
      dispatch(initLoad());
    }

    return () => {
      dispatch(clearControls());
    };
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
                  onClick={() => navigate(`/book/${id}`)}
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
