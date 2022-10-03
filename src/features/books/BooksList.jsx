import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Card } from '../../components/Card';
import { List } from '../../components/List';
import { LoadMoreButton } from '../../components/Buttons';
import { Loader } from '../../components/Loader';

import { useBooks } from '../../hooks/use-books';
import { loadMore } from './books-slice';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const BooksList = () => {
  const [books, { status, error, qty, pagination }] = useBooks();
  const { currIndex, pageTerm, step } = pagination;

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      {(error || pagination.error) && <Loader>Can't fetch data from the server =( </Loader>}
      {(status === 'loading') && <Loader pos={true} />}
      {(pagination.status === 'loading') && <Loader pos={null} />}
      {pageTerm && (currIndex <= qty-step) && pagination.status !== 'loading'
        && <LoadMoreButton onClick={() => dispatch(loadMore())}>Load more</LoadMoreButton>}
    </Wrapper>
  );
};
